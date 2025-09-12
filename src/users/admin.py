from django.contrib import admin

from users.models import SaltUser


admin.site.register(SaltUser)
