from django.contrib.auth.models import AbstractUser
from django.db import models


class SaltUser(AbstractUser):
    pass  # Leaving room for custom attributes later
