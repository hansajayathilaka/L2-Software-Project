#!/bin/sh

set -e

cd /app

python manage.py collectstatic --no-input

python manage.py migrate

gunicorn iiw_book_service.wsgi:application \
    --reload \
    --timeout 120 \
    --bind 0.0.0.0:${PORT}
