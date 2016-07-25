from django.views.generic.base import TemplateView
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status, mixins
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from datetime import datetime
import random
import string
from .models import Session, SessionPosition
from.serializers import SessionSerializer, SessionPositionSerializer


def ok(response=None):
    if(response is None):
        response = {}

    return Response({
        **response,
        **{'status': 'OK'}
    }, status=status.HTTP_200_OK)


def err(messages=None):
    if(messages is None):
        messages = []

    return Response({
        'status': 'ERR',
        'messages': messages
    }, status=status.HTTP_400_BAD_REQUEST)


# Create your views here


class SessionViewSet(viewsets.GenericViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    @list_route(methods=['get'])
    def generate(self, request):

        session = Session()
        session.key = ''.join(random.SystemRandom().choice(
            string.ascii_uppercase + string.ascii_lowercase + string.digits)
            for _ in range(8))

        session.date_created = datetime.now()
        session.save()

        serializer = self.serializer_class(session)

        return ok(serializer.data)


class SessionPositionViewSet(viewsets.GenericViewSet):
    queryset = SessionPosition.objects.all()
    serializer_class = SessionPositionSerializer

    def list(self, request, session_pk=None):
        try:
            s = Session.objects.get(key=session_pk)
        except Session.DoesNotExist:
            return err(['Session does not exist.'])

        # Check if a position has been set yet.
        if(not hasattr(s, 'position')):
            return err(['Session does not have a position yet.'])

        serializer = SessionPositionSerializer(s.position)

        return ok(serializer.data)

    @list_route(methods=['POST'])
    def set(self, request, session_pk=None):
        try:
            s = Session.objects.get(key=session_pk)
        except Session.DoesNotExist:
            return err(['Session does not exist.'])

        # If instance already exists, set the serializer to update mode.
        if(hasattr(s, "position")):
            serializer = SessionPositionSerializer(
                s.position,
                data=request.data
            )
        else:
            serializer = SessionPositionSerializer(data=request.data)

        # If the request was badly formatted, return serializer errors.
        if(serializer.is_valid() is False):
            return err(serializer.errors)

        # Set the session and save.
        serializer.save(session=s)

        return ok()


class MapView(TemplateView):

    template_name = "pokebot/map.html"

    def get_context_data(self, **kwargs):
        context = super(MapView, self).get_context_data(**kwargs)
        context["GMAPS_KEY"] = "AIzaSyAL6H1mk8mV_18aXRxhLVtBFNzwiT-ew9A"

        return context
