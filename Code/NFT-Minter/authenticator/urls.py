from django.urls import path
from authenticator.views import LoginView
from django.urls import include


urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
]

