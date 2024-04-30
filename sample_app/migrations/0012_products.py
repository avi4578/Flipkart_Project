# Generated by Django 4.2.11 on 2024-04-29 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample_app', '0011_kids_status_men_status_women_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('Id', models.IntegerField(primary_key=True, serialize=False)),
                ('product', models.CharField(blank=True, max_length=500, null=True)),
                ('status', models.CharField(blank=True, choices=[('1', 'Active'), ('0', 'Inactive')], default='1', max_length=20, null=True)),
            ],
            options={
                'db_table': 'products',
            },
        ),
    ]