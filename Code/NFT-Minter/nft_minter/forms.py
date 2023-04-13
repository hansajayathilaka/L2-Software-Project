from enum import Enum
from django.conf import settings

#from colorfield.fields import ColorField
from django.db import models
from django import forms


class VehicleTypes(Enum):
    PASSENGER_CAR = 'Passenger Car'
    LIGHT_TRUCK = 'Light Truck'
    HEAVY_DUTY_TRUCK = 'Medium and Heavy-Duty Trucks'
    BUS = 'Bus'
    MOTORCYCLE = 'Motorcycle'
    RECREATIONAL_VEHICLE = 'Recreational Vehicle'

    @classmethod
    def choices(cls):
        return tuple((i.name, i.value) for i in cls)


class FuelType(Enum):
    PETROL = 'Petrol'
    DIESEL = 'Diesel'
    ELECTRIC = 'Electric'
    KEROSENE_OIL = 'Kerosene Oil'
    OTHER = 'Other'

    @classmethod
    def choices(cls):
        return tuple((i.name, i.value) for i in cls)


class NFTRequestForm(forms.Form):
    owner_address = forms.CharField(label='Owner\'s Address', required=False if settings.DEBUG else True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    owner_name = forms.CharField(label='Full Name', required=False, widget=forms.TextInput(attrs={'class': 'form-control'}))
    owner_nic = forms.CharField(label='NIC', required=False if settings.DEBUG else True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    description = forms.CharField(label='Description', required=False, widget=forms.TextInput(attrs={'class': 'form-control'}))
    engine_no = forms.CharField(label='Engine Number', required=False if settings.DEBUG else True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    chassis_no = forms.CharField(label='Chassis Number', required=False if settings.DEBUG else True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    vehicle_type = forms.ChoiceField(label='Vehicle Type', choices=VehicleTypes.choices(), required=False if settings.DEBUG else True)
    company = forms.CharField(label='Company', required=False if settings.DEBUG else True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    fuel_type = forms.ChoiceField(label='Fuel Type', choices=FuelType.choices(), required=False if settings.DEBUG else True)
    vehicle_model = forms.CharField(label='Model Number', required=False, widget=forms.TextInput(attrs={'class': 'form-control'}))
    manufactured_date = forms.DateField(label='Date of Manufacture', required=False)
    registered_data = forms.DateField(label='Date of Registered', required=False if settings.DEBUG else True)
    body_type = forms.CharField(label='Body Type', required=False, widget=forms.TextInput(attrs={'class': 'form-control'}))
    wheel_base = forms.CharField(label='Wheel Base (cm)', required=False,  widget=forms.TextInput(attrs={'class': 'form-control'}))
    color = forms.CharField(label='Color', required=False,  widget=forms.TextInput(attrs={'class': 'form-control'}))
    seating_capacity = forms.IntegerField(label='Seating Capacity', required=False if settings.DEBUG else True)
    internal_height = forms.DecimalField(label='Internal Height (cm)', required=False)
    cylinder_capacity = forms.IntegerField(label='Cylinder Capacity (cc)', required=False if settings.DEBUG else True)
    price = forms.DecimalField(label="Estimation Price (MATIC)", required=True)
    thumbnail = forms.ImageField(label='Thumbnail', required=True)
    attachments = forms.FileField(label='Attachments', widget=forms.ClearableFileInput(attrs={'multiple': True}), required=True)
