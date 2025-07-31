from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    avatar = models.URLField(blank=True)

    USERNAME_FIELD = 'email'           # Use email to log in
    REQUIRED_FIELDS = ['username']     # Still require username for registration

    def __str__(self):
        return self.email
    
class Task(models.Model):
    name= models.CharField(max_length=100)
    date = models.DateField()
    completed= models.BooleanField(default=False)
    def __str__(self):
        return self.name