from django import forms

from .models import Verification

from django.contrib.auth.forms import AuthenticationForm



class BaseForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(BaseForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs["class"] = "form-control"


class EmailForm(BaseForm):
    class Meta:
        model = Verification
        fields = ["email"]


class PersonForm(BaseForm):
    class Meta:
        model = Verification
        fields = ["email", "nic", "fname", "lname", "dob", "address", "wallet_address", "sex", "img",]
        
