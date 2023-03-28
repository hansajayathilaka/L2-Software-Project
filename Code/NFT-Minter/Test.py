import requests

import json

files = {

'file': (open('C:/Users/hansa/Downloads/download.jpeg', 'rb'), open('C:/Users/hansa/Downloads/pexels-pixabay-45201.jpg', 'rb')),

}

project_id = '2EmjXF7GSMqwUg8CQb1q7F4ImWd'

project_secret = 'a07868d7486d89a1ee3dd2a1649c5571'

files = {
    'file1': open('C:/Users/hansa/Downloads/download.jpeg', 'rb'),
    'file2': open('C:/Users/hansa/Downloads/pexels-pixabay-45201.jpg', 'rb'),
}

response = requests.post('https://ipfs.infura.io:5001/api/v0/add', files=files, auth=(project_id, project_secret))

try:
    res = response.text.split('\n')
    hash_list = []
    for i in res:
        i = json.loads(i)
        hash_list.append(i['Hash'])
except Exception as e:
    print(e)

hash = p['Hash']

print(hash)
