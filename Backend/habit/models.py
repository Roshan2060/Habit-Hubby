from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


# this the section where the users data is stored


class User(AbstractUser):
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    avatar = models.URLField(blank=True)
    USERNAME_FIELD = 'email'          
    REQUIRED_FIELDS = ['username']     
    def __str__(self):
        return self.email

class Section(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="section")
    title = models.CharField(max_length= 100)
    def __str__(self):
        return self.title



class Task(models.Model):
    section = models.ForeignKey(Section,on_delete=models.CASCADE,related_name="tasks", null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    date = models.DateField()
    completed= models.BooleanField(default=False)
    def __str__(self):
        return self.name

