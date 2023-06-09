from django.urls import path

from . import views
from .views import ForgotPasswordView


urlpatterns = [
    path("login/", views.login_view, name='login'),
    path('forgot_password/', ForgotPasswordView.as_view(), name='forgot_password'),
    

    path("index/", views.index, name="index"), 
    path("submit/", views.submit, name="submit"),
    path("thanks/", views.thanks, name="thanks"),
    path("state/<str:connection_id>", views.state, name="state"),
    path(
        "in-progress/<str:connection_id>",
        views.in_progress,
        name="in_progress",
    ),
    path("verify/<str:connection_id>/", views.verify_redirect, name="verify_redirect"),
    path("webhooks/topic/<str:topic>/", views.webhooks, name="webhooks"),
]
