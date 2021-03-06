from django.conf.urls import url, include
from users.views import *


urlpatterns = [
    url(r'^(?P<pk>\d+)/$', UserView.as_view(), name='user'),
    url(r'^auth/$', AuthUserView.as_view(), name='login'),
]
