from django.db import models


class Fleet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    text = models.CharField(max_length=1000, blank=True)
    parent = models.ForeignKey(
        "self", related_name="replies", on_delete=models.SET_NULL, null=True, blank=True
    )
    is_deleted = models.BooleanField(default=False)
    fleet_type = models.ForeignKey(
        "FleetType",
        related_name="fleets",
        on_delete=models.PROTECT,
    )
    labels = models.ManyToManyField(
        "FleetLabel",
        related_name="fleets",
        blank=True,
    )
    score = models.IntegerField(default=0)
    private = models.BooleanField(default=False)
    quote_fleet = models.ForeignKey(
        "self",
        related_name="quoted_by",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    threads = models.ManyToManyField("Thread", related_name="fleets", blank=True)
    notes = models.CharField(max_length=1000, blank=True)
    metadata = models.JSONField(default=dict, blank=True)

    class Meta:
        indexes = [
            models.Index(
                fields=["created", "updated"]
            ),  # Indexing for improved query performance
        ]


class FleetLabel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    text = models.CharField(max_length=100, blank=True)
    notes = models.CharField(max_length=1000, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["created", "updated"]),
        ]


class FleetType(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    text = models.CharField(max_length=100, blank=True)
    notes = models.CharField(max_length=1000, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["created", "updated"]),
        ]


class Thread(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    original_post = models.OneToOneField(
        Fleet, on_delete=models.CASCADE, related_name="thread", null=True
    )

    class Meta:
        indexes = [
            models.Index(fields=["created"]),
        ]
