# Generated by Django 5.0.1 on 2024-01-08 00:59

import api.utils
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fleets', '0004_alter_fleet_text'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FleetThread',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=100)),
                ('description', models.CharField(blank=True, max_length=280)),
                ('status', models.CharField(choices=[('active', 'Active'), ('deleted', 'Deleted'), ('hidden', 'Hidden'), ('archived', 'Archived')], default='active')),
                ('meta', models.JSONField(blank=True, default=dict)),
            ],
        ),
        migrations.RemoveField(
            model_name='fleet',
            name='fleet_type',
        ),
        migrations.RemoveField(
            model_name='thread',
            name='original_post',
        ),
        migrations.RemoveIndex(
            model_name='fleet',
            name='fleets_flee_created_a478d5_idx',
        ),
        migrations.RemoveIndex(
            model_name='fleetlabel',
            name='fleets_flee_created_ad469d_idx',
        ),
        migrations.RenameField(
            model_name='fleet',
            old_name='metadata',
            new_name='meta',
        ),
        migrations.RemoveField(
            model_name='fleet',
            name='created',
        ),
        migrations.RemoveField(
            model_name='fleet',
            name='is_deleted',
        ),
        migrations.RemoveField(
            model_name='fleet',
            name='notes',
        ),
        migrations.RemoveField(
            model_name='fleet',
            name='parent',
        ),
        migrations.RemoveField(
            model_name='fleet',
            name='updated',
        ),
        migrations.RemoveField(
            model_name='fleetlabel',
            name='created',
        ),
        migrations.RemoveField(
            model_name='fleetlabel',
            name='notes',
        ),
        migrations.RemoveField(
            model_name='fleetlabel',
            name='text',
        ),
        migrations.RemoveField(
            model_name='fleetlabel',
            name='updated',
        ),
        migrations.AddField(
            model_name='fleet',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='fleets', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='fleet',
            name='description',
            field=models.CharField(blank=True, max_length=280),
        ),
        migrations.AddField(
            model_name='fleet',
            name='parent_fleet',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children', to='fleets.fleet'),
        ),
        migrations.AddField(
            model_name='fleet',
            name='publish_date',
            field=models.DateTimeField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='fleet',
            name='status',
            field=models.CharField(choices=[('active', 'Active'), ('deleted', 'Deleted'), ('hidden', 'Hidden'), ('archived', 'Archived')], default='active'),
        ),
        migrations.AddField(
            model_name='fleet',
            name='title',
            field=models.CharField(default=api.utils.get_friendly_timestamp, max_length=100),
        ),
        migrations.AddField(
            model_name='fleetlabel',
            name='color',
            field=models.CharField(default='#000000', max_length=7),
        ),
        migrations.AddField(
            model_name='fleetlabel',
            name='description',
            field=models.CharField(blank=True, max_length=280),
        ),
        migrations.AddField(
            model_name='fleetlabel',
            name='friendly_name',
            field=models.CharField(default='default', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='fleetlabel',
            name='meta',
            field=models.JSONField(blank=True, default=dict),
        ),
        migrations.AddField(
            model_name='fleetlabel',
            name='name',
            field=models.CharField(default='default', max_length=100, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='fleetthread',
            name='fleets',
            field=models.ManyToManyField(blank=True, related_name='thread_fleets', to='fleets.fleet'),
        ),
        migrations.AlterField(
            model_name='fleet',
            name='threads',
            field=models.ManyToManyField(blank=True, related_name='fleet_threads', to='fleets.fleetthread'),
        ),
        migrations.AddIndex(
            model_name='fleet',
            index=models.Index(fields=['status', 'private', 'score'], name='fleets_flee_status_33543e_idx'),
        ),
        migrations.DeleteModel(
            name='FleetType',
        ),
        migrations.DeleteModel(
            name='Thread',
        ),
        migrations.AddIndex(
            model_name='fleetthread',
            index=models.Index(fields=['status'], name='fleets_flee_status_ff2666_idx'),
        ),
    ]