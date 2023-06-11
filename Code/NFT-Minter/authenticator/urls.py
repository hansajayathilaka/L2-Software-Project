from django.urls import path

from django.contrib.auth import views as auth_views

from authenticator.views import LoginView
from authenticator.views import resetPasswordView

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('resetPassword', resetPasswordView.as_view(), name='resetPassword'), 
    path('resetPasswordDone', auth_views.PasswordResetDoneView.as_view(template_name='resetPasswordSend.html',), name='password_reset_done'),    
    path('resetPasswordConfirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('resetPasswordComplete', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    
]

