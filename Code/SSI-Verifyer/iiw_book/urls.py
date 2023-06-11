from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("get-invite", views.invite, name="invite"),
    path("state/<str:connection_id>", views.state, name="state"),
    path("verify/<str:connection_id>", views.verify, name="verify"),
    path("verified/", views.verified, name="verified"),
    path("in-progress/<str:connection_id>", views.in_progress, name="in_progress"),
    path("backend", views.backend, name="backend"),
    path("webhooks/topic/<str:topic>/", views.webhooks, name="webhooks"),
]
