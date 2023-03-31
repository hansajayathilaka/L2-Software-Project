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
    owner_address = forms.CharField(label='Owner\'s Address', required=False if settings.DEBUG else True)
    owner_name = forms.CharField(label='Full Name', required=False)
    owner_nic = forms.CharField(label='NIC', required=False if settings.DEBUG else True)
    description = forms.CharField(label='Description', widget=forms.Textarea, required=False)
    engine_no = forms.CharField(label='Engine Number', required=False if settings.DEBUG else True)
    chassis_no = forms.CharField(label='Chassis Number', required=False if settings.DEBUG else True)
    vehicle_type = forms.ChoiceField(label='Vehicle Type', choices=VehicleTypes.choices(), required=False if settings.DEBUG else True)
    company = forms.CharField(label='Company', required=False if settings.DEBUG else True)
    fuel_type = forms.ChoiceField(label='Fuel Type', choices=FuelType.choices(), required=False if settings.DEBUG else True)
    vehicle_model = forms.CharField(label='Model Number', required=False)
    manufactured_date = forms.DateField(label='Date of Manufacture', required=False)
    registered_data = forms.DateField(label='Date of Registered', required=False if settings.DEBUG else True)
    body_type = forms.CharField(label='Body Type', required=False)
    wheel_base = forms.CharField(label='Wheel Base (cm)', required=False)
    color = forms.CharField(label='Color', required=False)
    seating_capacity = forms.IntegerField(label='Seating Capacity', required=False if settings.DEBUG else True)
    internal_height = forms.DecimalField(label='Internal Height (cm)', required=False)
    cylinder_capacity = forms.IntegerField(label='Cylinder Capacity (cc)', required=False if settings.DEBUG else True)
    price = forms.DecimalField(label="Estimation Price (MATIC)", required=True)
    thumbnail = forms.ImageField(label='Thumbnail', required=True)
    attachments = forms.FileField(label='Attachments', widget=forms.ClearableFileInput(attrs={'multiple': True}), required=True)
