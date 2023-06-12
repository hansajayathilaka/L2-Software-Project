from django import forms

from .models import Verification

from django.contrib.auth.forms import AuthenticationForm
import re



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
        fields = ["fname", "lname","nic", "email",  "dob", "address", "sex", "wallet_address","img"]

    def clean_nic(self):
        nic = self.cleaned_data.get('nic')
        # custom validation logic for NIC field
        
        if len(nic) != 10:
            raise forms.ValidationError('Please enter an valid NIC')
        return nic
    
    def clean_fname(self):
        fname = self.cleaned_data.get('fname')
        # custom validation logic for first name field
        
        if not re.match("^[A-Za-z]+$", fname):
            raise forms.ValidationError('First Name should contain only alphabetic characters.')

        return fname
       
    def clean_lname(self):
        lname = self.cleaned_data.get('lname')
        # custom validation logic for first name field
        
        if not re.match("^[A-Za-z]+$", lname):
            raise forms.ValidationError('Last Name should contain only alphabetic characters.')

        return lname
       
    def clean_email(self):
        email = self.cleaned_data.get('email')
        # Add custom validation logic for email field
    
        if not re.match("^[\w\.-]+@[\w\.-]+\.\w+$",email):
            raise forms.ValidationError('Invalid email')
        return email

    
   
 
    def clean_wallet_address(self):
        wallet_address = self.cleaned_data.get('wallet_address')

        regex = r"^0x[a-fA-F0-9]{40}$"
        test_str = "0x9917EB0be0d1Ea4aF401BB8fc6627ad19F99c14f"
        matches = re.finditer(regex, test_str.strip())

        found = False
        for matchNum, match in enumerate(matches, start=1):
            print ("Match {matchNum} was found at {start}-{end}: {match}".format(matchNum = matchNum, start = match.start(), end = match.end(), match = match.group()))
            return wallet_address
        return forms.ValidationError('Invalid wallet address')


class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))

