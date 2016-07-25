from rest_framework.serializers import ModelSerializer
from .models import Session, SessionPosition


class SessionSerializer(ModelSerializer):

    class Meta:
        model = Session
        fields = ['key', 'date_created']


class SessionPositionSerializer(ModelSerializer):

    class Meta:
        model = SessionPosition
        fields = ('latitude', 'longitude')
