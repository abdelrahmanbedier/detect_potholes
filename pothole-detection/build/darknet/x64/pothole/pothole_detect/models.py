from django.db import models

class Image(models.Model) :
    image = models.FileField(upload_to='images/', blank=True, null=True)

class test(models.Model) :
    name = models.CharField(max_length=20)