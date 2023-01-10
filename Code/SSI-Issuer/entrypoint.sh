#!/bin/sh

set -e

cd /app

python manage.py collectstatic --no-input

python manage.py migrate

gunicorn email_verification_service.wsgi:application \
    --reload \
    --timeout 120 \
    --bind 0.0.0.0:8080
