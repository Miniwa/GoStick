from django.conf.urls import url, include
from rest_framework import routers
from rest_framework_nested import routers

from . import views

router = routers.SimpleRouter()
router.register("session", views.SessionViewSet)

position_router = routers.NestedSimpleRouter(router, "session", lookup="session")
position_router.register("position", views.SessionPositionViewSet)

urlpatterns = [
    url(r'^$', views.MapView.as_view(), name='map'),
    url(r'^', include(router.urls)),
    url(r'^', include(position_router.urls)),
]
