"""
Django settings for production of justina_io_server project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""


from .common import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# SECURITY WARNING: keep the secret key used in production secret!
from justina_io_server.settings import get_secret
SECRET_KEY = get_secret('SECRET_KEY')


ALLOWED_HOSTS = ['*']


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATICFILES_DIRS = [
    BASE_DIR / "static/",
]


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DB_NAME = get_secret('DB_NAME')
DB_USER = get_secret('DB_USER')
DB_PASSWORD = get_secret('DB_PASSWORD')
DB_HOST = get_secret('DB_HOST')
DB_PORT = get_secret('DB_PORT')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASSWORD,
        'HOST': DB_HOST,
        'PORT': DB_PORT
    }
}