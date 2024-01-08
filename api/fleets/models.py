from django.db import models
from django.conf import settings

from api.constants import FleetStatus, FleetThreadStatus
from api.utils import get_friendly_timestamp


class Fleet(models.Model):
    """
    Represents a Fleet in the application.
    """

    title = models.CharField(max_length=100, default=get_friendly_timestamp)
    text = models.CharField(max_length=1000)
    description = models.CharField(max_length=280, blank=True)
    score = models.IntegerField(default=0)
    status = models.CharField(
        choices=FleetStatus.choices,
        default=FleetStatus.ACTIVE,
    )
    private = models.BooleanField(default=False)

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="fleets",
        on_delete=models.PROTECT,
        null=True,
    )

    publish_date = models.DateTimeField(null=True, default=None, blank=True)

    parent_fleet = models.ForeignKey(
        "self",
        related_name="children",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    quote_fleet = models.ForeignKey(
        "self",
        related_name="quoted_by",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    labels = models.ManyToManyField("FleetLabel", related_name="fleets", blank=True)
    threads = models.ManyToManyField(
        "FleetThread", related_name="fleet_threads", blank=True
    )

    meta = models.JSONField(default=dict, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["status", "private", "score"]),
        ]

    def __str__(self):
        return self.text


class FleetLabel(models.Model):
    """
    Represents a label for a Fleet.
    """

    name = models.CharField(max_length=100, unique=True)
    friendly_name = models.CharField(max_length=100)
    description = models.CharField(max_length=280, blank=True)
    color = models.CharField(max_length=7, default="#000000")

    meta = models.JSONField(default=dict, blank=True)

    class Meta:
        indexes = []

    def __str__(self):
        return self.name


class FleetThread(models.Model):
    """
    Represents a thread of Fleets.
    """

    title = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=280, blank=True)
    fleets = models.ManyToManyField("Fleet", related_name="thread_fleets", blank=True)
    status = models.CharField(
        choices=FleetThreadStatus.choices,
        default=FleetThreadStatus.ACTIVE,
    )

    meta = models.JSONField(default=dict, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["status"]),
        ]

    def __str__(self):
        return self.title or "Unnamed Thread"
