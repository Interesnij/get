from django.conf.urls import url
from works.views import *


urlpatterns = [
    url(r'^list/(?P<slug>[\w\-]+)/$', WorksCatView.as_view(), name="works_list"),
    url(r'^(?P<pk>\d+)/$', WorksDetailView.as_view(), name="work")
]