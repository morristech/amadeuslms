# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-01-12 17:08
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('subjects', '0011_auto_20170110_1446'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='subject',
            options={'ordering': ['name'], 'verbose_name': 'Subject', 'verbose_name_plural': 'Subjects'},
        ),
    ]