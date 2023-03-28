from django.shortcuts import render, redirect
from django.views.generic import View

from nft_minter.forms import NFTRequestForm
from nft_minter.utils import upload_files_to_ipfs, mint_nft


# Create your views here.
class NFTCreateView(View):
    def get(self, request):
        form = NFTRequestForm()
        return render(request, 'nft-request-form.html', {'form': form})

    def post(self, request):
        form = NFTRequestForm(request.POST, request.FILES)
        if form.is_valid():
            # Save thumbnail and attachments to IPFS
            thumbnail = form.cleaned_data.get('thumbnail')
            attachments = form.files.getlist('attachments')
            hash_list = upload_files_to_ipfs([thumbnail, *attachments])

            if hash_list:
                nft_data = {
                    'name': f"{form.cleaned_data['company']} - {form.cleaned_data['vehicle_model']}",
                    'description': form.cleaned_data['description'],
                    'more_data': {
                        'engine_no': form.cleaned_data['engine_no'],
                        'chassis_no': form.cleaned_data['chassis_no'],
                        'vehicle_type': form.cleaned_data['vehicle_type'],
                        'company': form.cleaned_data['company'],
                        'fuel_type': form.cleaned_data['fuel_type'],
                        'vehicle_model': form.cleaned_data['vehicle_model'],
                        'manufactured_date': form.cleaned_data['manufactured_date'],
                        'registered_data': form.cleaned_data['registered_data'],
                        'body_type': form.cleaned_data['body_type'],
                        'wheel_base': form.cleaned_data['wheel_base'],
                        'color': form.cleaned_data['color'],
                        'seating_capacity': form.cleaned_data['seating_capacity'],
                        'internal_height': form.cleaned_data['internal_height'],
                        'cylinder_capacity': form.cleaned_data['cylinder_capacity'],
                    },
                    'thumbnail': hash_list[0],
                    'attachments': [
                        {
                            'description': "Thumbnail",
                            'fileUrl': hash_list[0]
                        },
                        *[
                            {
                                'description': "Attachment",
                                'fileUrl': _hash
                            } for _hash in hash_list[1:]
                        ]
                    ]
                }

                # Mint NFT
                try:
                    mint_nft(
                        nft_data,
                        form.cleaned_data['price'],
                        form.cleaned_data['owner_name'],
                        form.cleaned_data['owner_nic']
                    )
                except Exception as e:
                    print(e)
                    return render(request, 'nft-request-form.html', {
                        'form': form,
                        'errors': {
                            'NFT Minting': 'Error while minting nft',
                        }})
            else:
                return render(request, 'nft-request-form.html',{
                    'form': form,
                    'errors': {
                        'File upload': 'Error while uploading files to IPFS',
                    }})
            ...
        else:
            if form.errors:
                return render(request, 'nft-request-form.html', {'form': form, 'errors': form.errors})
            else:
                return render(request, 'nft-request-form.html', {'form': form})
        return redirect('home')
