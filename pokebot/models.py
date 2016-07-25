from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
# Create your models here.


class Session(models.Model):
    key = models.CharField(max_length=8, unique=True)
    date_created = models.DateTimeField()


class SessionPosition(models.Model):
    session = models.OneToOneField(Session, related_name="position")

    latitude = models.FloatField(validators=[
                    MaxValueValidator(90),
                    MinValueValidator(-90)
                ])

    longitude = models.FloatField(validators=[
                    MaxValueValidator(180),
                    MinValueValidator(-180)
                ])
