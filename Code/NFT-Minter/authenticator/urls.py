from django.urls import path

from authenticator.views import LoginView

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
]
