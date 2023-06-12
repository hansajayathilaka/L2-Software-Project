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
            try:
                hash_list = upload_files_to_ipfs([thumbnail, *attachments])
                print("Images uploaded successfully")
            except Exception as e:
                form.add_error(None, str(e))
                hash_list = []

            if hash_list:
                nft_data = {
                    'name': f"{form.cleaned_data['company']} - {form.cleaned_data['vehicle_model']}",
                    'description': form.cleaned_data['description'],
                    'more_data': {
                        'engine_no': str(form.cleaned_data['engine_no']),
                        'chassis_no': str(form.cleaned_data['chassis_no']),
                        'vehicle_type': str(form.cleaned_data['vehicle_type']),
                        'company': str(form.cleaned_data['company']),
                        'fuel_type': str(form.cleaned_data['fuel_type']),
                        'vehicle_model': str(form.cleaned_data['vehicle_model']),
                        'manufactured_date': str(form.cleaned_data['manufactured_date']),
                        'registered_data': str(form.cleaned_data['registered_date']),
                        'body_type': str(form.cleaned_data['body_type']),
                        'wheel_base': str(form.cleaned_data['wheel_base']),
                        'color': str(form.cleaned_data['color']),
                        'seating_capacity': str(form.cleaned_data['seating_capacity']),
                        'internal_height': str(form.cleaned_data['internal_height']),
                        'cylinder_capacity': str(form.cleaned_data['cylinder_capacity']),
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
                print(nft_data)
                # Mint NFT
                try:
                    mint_nft(
                        nft_data,
                        form.cleaned_data['price'],
                        form.cleaned_data['owner_name'],
                        form.cleaned_data['owner_nic'],
                        form.cleaned_data['owner_address'],
                    )
                except Exception as e:
                    print(e)
                    form.add_error(None, str(e))
            else:
                form.add_error(None, "Error while uploading files to IPFS")
            return render(request, 'nft-request-form.html', {'form': form, 'errors': form.errors})
        else:
            return render(request, 'nft-request-form.html', {'form': form, 'errors': form.errors})
