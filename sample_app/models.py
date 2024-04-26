from django.db import models

# Create your models here.

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

# class Usermaster(models.Model):
#     ID=models.AutoField(primary_key=True)
#     Fullname=models.CharField(max_length=100,blank=True,null=True)
#     Email=models.CharField(max_length=100,blank=True,null=True)
#     Password=models.CharField(max_length=100,blank=True,null=True)
#     Confirmpassword=models.CharField(max_length=100,blank=True,null=True)

#     class Meta:
#         db_table='usermaster'


class Document(models.Model):
    Id=models.IntegerField(primary_key=True)
    Title=models.CharField(max_length=100,blank=True,null=True)
    UploadDocumentType=models.CharField(max_length=100,blank=True,null=True)
    ContactMobile=models.CharField(max_length=10,blank=True,null=True)
    Emailid=models.EmailField(blank=True,null=True)
    Department=models.CharField(max_length=100,blank=True,null=True)
 
    class Meta:
        db_table='document'

    
        
