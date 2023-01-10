from django.db import models
from jsonfield import JSONField


class Attendee(models.Model):
    connection_id = models.UUIDField()
    email = models.EmailField(max_length=100)
    fname = models.CharField("First Name", max_length=30)
    lname = models.CharField("Last Name", max_length=30)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        app_label = 'iiw_book'


class SessionState(models.Model):
    connection_id = models.UUIDField()
    state = models.TextField()
    data = JSONField()

    class Meta:
        app_label = 'iiw_book'
