#!/bin/sh

python manage.py makemigrations
python manage.py migrate --no-input
python manage.py createsuperuser --username=Admin --email=admin@justina-io.com --noinput
python manage.py collectstatic --noinput
gunicorn justina_io_server.wsgi --bind=0.0.0.0:8000
