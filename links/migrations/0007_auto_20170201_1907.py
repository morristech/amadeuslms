# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-01 22:07
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('links', '0006_auto_20170201_1756'),
    ]

    operations = [
        migrations.RenameField(
            model_name='link',
            old_name='description',
            new_name='description_brief',
        ),
    ]