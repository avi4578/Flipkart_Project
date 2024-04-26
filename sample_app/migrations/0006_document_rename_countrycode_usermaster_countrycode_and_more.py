# Generated by Django 4.2.11 on 2024-04-16 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample_app', '0005_alter_usermaster_countrycode'),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('Id', models.IntegerField(primary_key=True, serialize=False)),
                ('Title', models.CharField(blank=True, max_length=100, null=True)),
                ('UploadDocumentType', models.CharField(blank=True, max_length=100, null=True)),
                ('ContactMobile', models.CharField(blank=True, max_length=10, null=True)),
                ('Emailid', models.EmailField(blank=True, max_length=254, null=True)),
                ('Department', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'document',
            },
        ),
        migrations.RenameField(
            model_name='usermaster',
            old_name='countrycode',
            new_name='countryCode',
        ),
        migrations.AlterField(
            model_name='usermaster',
            name='mobilenumber',
            field=models.CharField(db_column='mobilenumber', max_length=20),
        ),
    ]
