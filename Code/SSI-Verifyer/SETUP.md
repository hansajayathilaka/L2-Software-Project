# Email verification system and authentication via Indy blockchain
## How it's work

### Get Credentials

- First you should have a mobile wallet compatible for self sovering credentials.(eg: Trinsic Wallet)
- Goto credentials issuer web site.
- Enter your email address and click submit.
- There will be a email containing a verification link.
- Click on the link.
- It will appirer a QR code.
- Scan it from the wallet.
- It will appear a popup asking to accept or decline the request.
- Tap on Accept.
- Next you will have a notification. It is Credential Offer.
- Accept it to save given credentials in your wallet.
- Goto credentials in the mobile wallet and there will be your credentials.

### Prescent Credentials

 - To prescent credentials you should have credential. If not you have to fallow above steps to get one.
 - Goto the web page that you want to prescent your credentials.
 - Get the QR code by connecting to it.
 - Scan the QR code from the mobile wallet application.
 - There will be a popup asking for accept and decline.
 - Tap in accept to create connection between the web application and your mobile wallet.
 - After few seconds there will be a notification requesting proof of credentials.
 - Tap on that notification.
 - Select the credential that you want to prescent.
 - Tap on prescent to prescent the credentials.
 - Then automatically web page will receive the credentials that you prescent from your mobile.

## How to setup on your machine for a DEMO

 - First you should have a indy blockchain.
	 - You can create your own `von network` from [here](https://github.com/bcgov/von-network).
	 - If not you can use already exising Von blockchain like [BCovrin](test.bcovrin.vonx.io).
 - You should install `docker`, `docker-compose` and `s2i`.
 - Here are the main git links to [`indy-email-verification`](https://github.com/bcgov/indy-email-verification) and [`iiwbook`](https://github.com/bcgov/iiwbook).
 - There are some incompatabilities and some errors in manage and docker-compose.yml files in those repos. In this project I have corrected them and commited. You can use it.
 - Setup `indy-email-verification`.
	 - First goto `indy-email-verification/docker/docker-compose.yml`.
	 - In line `47` there is a link `http://<Server-URL>:8080` change it by replacing `<Server-URL>` according to your sever. This should be the URL that you put in the browser.
	 - This setup is configured to `Test BCovrin` network. If you want to change the network replace `http://test.bcovrin.vonx.io` with your own network.
	 - `./manage build` use this command to build your docker images.
	 - `AGENT_WALLET_SEED="<seed>" SITE_URL=http://<Server-URL>:10000 ./manage start` change `<seed>` as you wish and put the `<Server-URL>` as you use previously.
	 - `http://<Server-URL>:8080` will be your web server.
	 - `http://<Server-URL>:10000` URL will use for the verification purposes.
	 - `http://<Server-URL>:8050` will be the mail server. You can get your verification mail from this.
 - Setup `iiwbook`.
	 - Goto `iiwbook/docker/docker-compose.yml`.
	 - In line `55` there is a link `http://<Server-URL>:7070` change it by replacing `<Server-URL>` according to your sever. This should be the URL that you put in the browser.
	 - In line `54` change the DID with the did of the issuer. In this senario issuer is `indy-email-verification` project.
	 - This setup is configured to `Test BCovrin` network. If you want to change the network replace `http://test.bcovrin.vonx.io` with your own network and replace line `10,11,12,13` with the genisis file from your own network. 
	 - `./manage build` use this command to build your docker images.
	 - `AGENT_WALLET_SEED="<seed>" SITE_URL=http://<Server-URL>:11000 ./manage start` change `<seed>` as you wish and put the `<Server-URL>` as you use previously.
	 - `http://<Server-URL>:7070` will be your web server.
	 - `http://<Server-URL>:11000` URL will use for the verification purposes.
	 - `http://<Server-URL>:7050` will be the mail server.

