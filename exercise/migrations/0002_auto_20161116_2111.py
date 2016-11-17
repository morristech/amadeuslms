# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-11-17 00:11
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('exercise', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='professors',
            field=models.ManyToManyField(related_name='professors_exercise', to=settings.AUTH_USER_MODEL, verbose_name='Professors'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='students',
            field=models.ManyToManyField(blank=True, related_name='subject_exercise', to=settings.AUTH_USER_MODEL, verbose_name='Students'),
        ),
    ]
