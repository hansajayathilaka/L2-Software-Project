from django.db import models

SEX_CHOICES = (
    ("male", "Male"),
    ("female", "Female"),
)


class Verification(models.Model):
    fname = models.CharField("First Name", max_length=30)
    lname = models.CharField("Last Name", max_length=30)
    nic = models.CharField("NIC", max_length=12)
    email = models.EmailField(max_length=100)
    dob = models.DateField("Date of Birth", null=True, blank=True)
    address = models.TextField("Address", null=True, blank=True)
    sex = models.CharField("Sex", choices=SEX_CHOICES, max_length=10, default="male", null=True, blank=True)
    wallet_address = models.CharField("Wallet Address", max_length=1024, null=True)
    img = models.ImageField("Image", null=True, blank=True)
    
    

    connection_id = models.UUIDField()
    invite_url = models.URLField(max_length=2000)


class SessionState(models.Model):
    connection_id = models.UUIDField()
    state = models.TextField()
