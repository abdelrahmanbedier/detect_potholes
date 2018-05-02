from rest_framework import serializers
from .models import *
from drf_extra_fields.fields import Base64ImageField

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = test
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer) :
    image = Base64ImageField()
    class Meta:
        model = Image
        fields = '__all__'