from django.db import models


class FleetStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    DELETED = "deleted", "Deleted"
    HIDDEN = "hidden", "Hidden"
    ARCHIVED = "archived", "Archived"


class FleetThreadStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    DELETED = "deleted", "Deleted"
    HIDDEN = "hidden", "Hidden"
    ARCHIVED = "archived", "Archived"
