# Generated by Django 5.0.1 on 2024-01-07 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fleets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='thread',
            name='title',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
