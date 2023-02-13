# Self-Sovereign Identity (SSI) Issuer

This project is used to Issue the credentials to the user. There is a web page to fill the user information and submit. It will return the SSI credentials. Please refer the project [click here](https://github.com/hansajayathilaka/Indy-Email-Verification-Demo/tree/master/indy-email-verification).

Run docker containers
```commandline
docker compose --env-file=./.env.dev build
docker compose --env-file=./.env.dev up -d
```