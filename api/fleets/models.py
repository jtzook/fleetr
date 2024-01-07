from django.db import models

from api.constants import FleetTypeName
from api.utils import get_friendly_timestamp


class Fleet(models.Model):
    """
    Represents a Fleet in the application.
    """

    title = models.CharField(max_length=100, default=get_friendly_timestamp)
    text = models.CharField(max_length=1000)
    description = models.CharField(max_length=280, blank=True)
    score = models.IntegerField(default=0)
    is_deleted = models.BooleanField(default=False)
    private = models.BooleanField(default=False)

    fleet_type = models.ForeignKey(
        "FleetType",
        related_name="fleets",
        on_delete=models.PROTECT,
        null=True,
    )
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
    threads = models.ManyToManyField("Thread", related_name="fleets", blank=True)

    meta = models.JSONField(default=dict, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["is_deleted", "private", "score"]),
        ]

    def __str__(self):
        return self.text


class FleetLabel(models.Model):
    """
    Represents a label for a Fleet.
    """

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=280, blank=True)
    color = models.CharField(max_length=7, default="#000000")

    meta = models.JSONField(default=dict, blank=True)

    class Meta:
        indexes = []

    def __str__(self):
        return self.name


class FleetType(models.Model):
    """
    Represents a type of Fleet.
    """

    name = models.CharField(
        max_length=100, blank=False, unique=True, default=FleetTypeName.DEFAULT
    )
    description = models.CharField(max_length=280, blank=True)
    is_deleted = models.BooleanField(default=False)

    meta = models.JSONField(default=dict, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["name", "is_deleted"]),
        ]

    def __str__(self):
        return self.name


class Thread(models.Model):
    """
    Represents a thread of Fleets.
    """

    title = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=280, blank=True)
    fleets = models.ManyToManyField("Fleet", related_name="threads", blank=True)
    is_deleted = models.BooleanField(default=False)

    meta = models.JSONField(default=dict, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["is_deleted"]),
        ]

    def __str__(self):
        return self.title or "Unnamed Thread"
