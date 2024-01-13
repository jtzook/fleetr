from django.contrib import admin

# Register your models here.

from .models import Fleet, FleetLabel, FleetTag, FleetThread

admin.site.register(Fleet)
admin.site.register(FleetLabel)
admin.site.register(FleetTag)
admin.site.register(FleetThread)
