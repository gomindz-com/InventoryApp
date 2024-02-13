from rest_framework import serializers
from .models import MobileUser, UserActivity
# from rest_framework.validators import UniqueValidator
# from django.contrib.auth.password_validation import validate_password


class MobileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    
    class Meta:
        model = MobileUser
        fields = [ 'email', 'username', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True}
        }


class RegisterSerializer(MobileSerializer):
    class Meta(MobileSerializer.Meta):
        fields = MobileSerializer.Meta.fields + ['email', 'username', 'password', 'first_name', 'last_name']

    # def validate(self, attrs):
    #     if attrs['password'] != attrs['password2']:
    #         raise serializers.ValidationError({"password": "Password fields didn't match."})

    #     return attrs

    def create(self, validated_data):
        user = MobileUser.objects.create_user(**validated_data)
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    

class UserActivitySerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    timestamp = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S')

    class Meta:
        model = UserActivity
        fields = '__all__'
        read_only_fields = ['id', 'email', 'username', 'activity_type', 'details', 'timestamp']