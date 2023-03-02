from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    
    class Meta:
        model = CustomUser
        fields = [ 'email', 'username', 'password', 'first_name', 'last_name', 'profile', 'company_name', 'contact', 'postcode', 'city']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        Token.objects.create(user=instance)
        return instance

