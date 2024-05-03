from django.db import models

# Create your models here.

choice_for_status=(
    ('1','Active'),
    ('0','Inactive'),
)


GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
class Usermaster(models.Model):
    id = models.IntegerField(primary_key=True)
    email = models.CharField(max_length=100, blank=True, null=True)  # Field name made lowercase.
    fullname = models.CharField(db_column='FullName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=100, blank=True, null=True)  # Field name made lowercase.
    confirmpassword = models.CharField(db_column='ConfirmPassword', max_length=100, blank=True, null=True)  # Field name made lowercase.
    mobilenumber = models.CharField(db_column='mobilenumber', max_length=20)  # Field name made lowercase.
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
    countryCode = models.CharField(max_length=1500,blank=True, null=True)


    class Meta:
        managed = True
        db_table = 'usermaster'


class Document(models.Model):
    Id=models.IntegerField(primary_key=True)
    Title=models.CharField(max_length=100,blank=True,null=True)
    UploadDocumentType=models.CharField(max_length=100,blank=True,null=True)
    ContactMobile=models.CharField(max_length=10,blank=True,null=True)
    Emailid=models.EmailField(blank=True,null=True)
    Department=models.CharField(max_length=100,blank=True,null=True)
 
    class Meta:
        db_table='document'

    
class Men(models.Model):
    Id=models.IntegerField(primary_key=True)
    mensproduct=models.CharField(max_length=500,blank=True,null=True)
    status=models.CharField(max_length=20,choices=choice_for_status,blank=True,null=True,default='1')

    class Meta:
        db_table='men'

class kids(models.Model):
    Id=models.IntegerField(primary_key=True)
    kidsproduct=models.CharField(max_length=500,blank=True,null=True)
    status=models.CharField(max_length=20,choices=choice_for_status,blank=True,null=True,default='1')

    class Meta:
        db_table='kids'

class Women(models.Model):
    Id=models.IntegerField(primary_key=True)
    womensproduct=models.CharField(max_length=500,blank=True,null=True)
    status=models.CharField(max_length=20,choices=choice_for_status,blank=True,null=True,default='1')

    class Meta:
        db_table='womens'

class Products(models.Model):
    Id=models.AutoField(primary_key=True)
    title=models.CharField(max_length=200,blank=True,null=True)
    product=models.CharField(max_length=200,blank=True,null=True)
    # image=models.ImageField(blank=True,null=True)
    description=models.CharField(max_length=1000,blank=True,null=True)
    category=models.CharField(max_length=20,blank=True,null=True)
    price=models.CharField(max_length=20,blank=True,null=True)
    quantity=models.IntegerField(blank=True,null=True)
    status=models.CharField(max_length=20,choices=choice_for_status,blank=True,null=True,default='1')
    size=models.CharField(max_length=20,blank=True,null=True)
    lastupdated=models.DateTimeField(blank=True,null=True,auto_now=True)

    class Meta:
        db_table='products'