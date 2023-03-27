from django.shortcuts import render, redirect
from django.views.generic import View

from nft_minter.forms import NFTRequestForm
from nft_minter.utils import upload_to_ipfs


# Create your views here.
class NFTCreateView(View):
    def get(self, request):
        form = NFTRequestForm()
        return render(request, 'nft-request-form.html', {'form': form})

    def post(self, request):
        form = NFTRequestForm(request.POST, request.FILES)
        if form.is_valid():
            upload_to_ipfs([form.cleaned_data['thumbnail']])
            # nft_data = {
            #     'name': f"{form.cleaned_data['company']} - {form.cleaned_data['vehicle_model']}",
            #     'description': form.cleaned_data['description'],
            #     'thumbnail': form.cleaned_data['thumbnail'],
            #     'attachments': [
            #         {
            #             'description': "Thumbnail",
            #             'fileUrl': fileUrl
            #         }
            #     ]
            # }
        else:
            if form.errors:
                return render(request, 'nft-request-form.html', {'form': form, 'errors': form.errors})
            else:
                return render(request, 'nft-request-form.html', {'form': form})
        return redirect('home')
