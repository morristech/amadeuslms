# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-02-09 17:34
from __future__ import unicode_literals

from django.db import migrations, models
import pdf_file.models


class Migration(migrations.Migration):

    dependencies = [
        ('pdf_file', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pdffile',
            name='file',
            field=models.FileField(upload_to='files/', validators=[pdf_file.models.validate_file_extension], verbose_name='File'),
        ),
    ]
