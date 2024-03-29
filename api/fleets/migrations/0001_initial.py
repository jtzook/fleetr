# Generated by Django 5.0.1 on 2024-01-07 16:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FleetLabel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('text', models.CharField(blank=True, max_length=100)),
                ('notes', models.CharField(blank=True, max_length=1000)),
            ],
            options={
                'indexes': [models.Index(fields=['created', 'updated'], name='fleets_flee_created_ad469d_idx')],
            },
        ),
        migrations.CreateModel(
            name='FleetType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('text', models.CharField(blank=True, max_length=100)),
                ('notes', models.CharField(blank=True, max_length=1000)),
            ],
            options={
                'indexes': [models.Index(fields=['created', 'updated'], name='fleets_flee_created_c747c9_idx')],
            },
        ),
        migrations.CreateModel(
            name='Fleet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('text', models.CharField(blank=True, max_length=1000)),
                ('is_deleted', models.BooleanField(default=False)),
                ('score', models.IntegerField(default=0)),
                ('private', models.BooleanField(default=False)),
                ('notes', models.CharField(blank=True, max_length=1000)),
                ('metadata', models.JSONField(blank=True, default=dict)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='replies', to='fleets.fleet')),
                ('quote_fleet', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='quoted_by', to='fleets.fleet')),
                ('labels', models.ManyToManyField(blank=True, related_name='fleets', to='fleets.fleetlabel')),
                ('fleet_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='fleets', to='fleets.fleettype')),
            ],
        ),
        migrations.CreateModel(
            name='Thread',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('original_post', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='thread', to='fleets.fleet')),
            ],
        ),
        migrations.AddField(
            model_name='fleet',
            name='threads',
            field=models.ManyToManyField(blank=True, related_name='fleets', to='fleets.thread'),
        ),
        migrations.AddIndex(
            model_name='thread',
            index=models.Index(fields=['created'], name='fleets_thre_created_6b4933_idx'),
        ),
        migrations.AddIndex(
            model_name='fleet',
            index=models.Index(fields=['created', 'updated'], name='fleets_flee_created_a478d5_idx'),
        ),
    ]
