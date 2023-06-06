from django.urls import path

from authenticator.views import LoginView
from authenticator.views import resetPasswordView

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('resetPassword', resetPasswordView.as_view(), name='resetPassword'),
   
]
