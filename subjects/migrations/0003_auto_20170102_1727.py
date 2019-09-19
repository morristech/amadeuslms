# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-01-02 20:27
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('subjects', '0002_auto_20161226_2054'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subject',
            name='description',
            field=models.CharField(blank=True, max_length=300, verbose_name='description'),
        ),
        migrations.AlterField(
            model_name='subject',
            name='description_brief',
            field=models.CharField(blank=True, max_length=100, verbose_name='simpler_description'),
        ),
        migrations.AlterField(
            model_name='subject',
            name='markers',
            field=models.ManyToManyField(blank=True, null=True, to='subjects.Marker', verbose_name='markers'),
        ),
        migrations.AlterField(
            model_name='subject',
            name='max_upload_size',
            field=models.IntegerField(default=1024, null=True, verbose_name='Maximum upload size'),
        ),
        migrations.AlterField(
            model_name='subject',
            name='professor',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='professor', to=settings.AUTH_USER_MODEL),
        ),
    ]