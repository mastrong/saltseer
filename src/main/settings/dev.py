from .base import *

DEBUG = True
ALLOWED_HOSTS = []

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "saltseer",
        "USER": "saltseer",
        "PASSWORD": "saltseer",
        "HOST": "localhost",   # since Django runs locally
        "PORT": "5432",
    }
}

