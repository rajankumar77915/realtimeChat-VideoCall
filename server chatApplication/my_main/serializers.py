from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    def validate_profilePic(self, value):
        if not value.content_type.startswith('image'):
            raise serializers.ValidationError('Invalid file type')
        return value

    def create(self, validated_data):
        profile_pic = self.context['request'].FILES.get('profilePic')
        if profile_pic:
            validated_data['profilePic'] = profile_pic
        return super().create(validated_data)

    def update(self, instance, validated_data):
        profile_pic = self.context['request'].FILES.get('profilePic')
        if profile_pic:
            validated_data['profilePic'] = profile_pic
        return super().update(instance, validated_data)

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class ReportInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportInfo
        fields = '__all__'

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class MessageInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class LoginInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginInfo
        fields = '__all__'


class ImgSerializer(serializers.ModelSerializer):
    # image = serializers.ImageField(max_length=None, allow_empty_file=True,allow_null=True,use_url=True, required=False)
    class Meta:
        model = Img
        fields = ['image']