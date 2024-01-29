from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import CustomUser, UserActivity
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [ 'id', 'email', 'username', 'password', 'first_name', 'last_name', 'profile', 'company_name', 'contact', 'postcode', 'city', 'is_active']


class SubscriberUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser


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
        


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = [ 'email', 'username', 'password', 'password2', 'first_name', 'last_name', 'company_name', 'contact', 'postcode', 'city']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            profile = 'profiles/default.png',
            company_name=validated_data['company_name'],
            contact=validated_data['contact'],
            postcode=validated_data['postcode'],
            city=validated_data['city']
        )

        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user




class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = [ 'email',  'password']




class UpdateUserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'profile', 'company_name', 'contact', 'postcode', 'city']

    def validate_company_name(self, value):
        user = self.context['request'].user
        if CustomUser.objects.exclude(pk=user.pk).filter(company_name=value).exists():
            raise serializers.ValidationError({"username": "This company is already in use."})
        return value



class UpdatePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('old_password', 'password', 'password_confirm')

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance




class UserActivitySerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = UserActivity
        fields = [ 'id', 'email', 'username', 'activity_type', 'details', 'timestamp']






       
