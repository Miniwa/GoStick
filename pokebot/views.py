from django.views.generic.base import TemplateView

# Create your views here.


class MapView(TemplateView):

    template_name = "pokebot/map.html"

    def get_context_data(self, **kwargs):
        context = super(MapView, self).get_context_data(**kwargs)
        context["GMAPS_KEY"] = "AIzaSyAL6H1mk8mV_18aXRxhLVtBFNzwiT-ew9A"

        return context
