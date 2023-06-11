from django.urls import path

from nft_minter.views import NFTCreateView

urlpatterns = [
    path('', NFTCreateView.as_view(), name='home'),
]
