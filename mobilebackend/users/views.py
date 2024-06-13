# Create your views here.
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer, MobileUserSerializer, UserActivitySerializer
from rest_framework.permissions import AllowAny, IsAuthenticated ##, UpdateUserProfileSerializer, UpdatePasswordSerializer, ResetPasswordSerializer,  SubscriberSerializer, SubscriberUpdateSerializer, 
from rest_framework.request import Request
from django.contrib.auth import authenticate
from .models import MobileUser, UserActivity
from rest_framework.authtoken.models import Token as AuthToken
from django.contrib.auth.signals import user_logged_in


import logging
logger = logging.getLogger('app_api')


class RegisterUser(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = MobileUser.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        response = {
            "status": True,
            "message": "User Successfully Registered",
                }                
        return Response(data=response, status=status.HTTP_201_CREATED)

    

class LoginUser(APIView):

    print("User Login EndPoint Called")
    permission_classes = [AllowAny]
    def post(self, request: Request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data.get('email')
        password = request.data.get('password')
        print(email)
        print(password)

        user = authenticate(email=email, password=password)
        if user is not None:
            user_logged_in.send(sender=self.__class__, request=request, user=user)
            token, created = AuthToken.objects.get_or_create(user=user)
            serializer = MobileUserSerializer(user)
            response = {
                "status": True,
                "message": "login Successful",
                "user": serializer.data,
                "token": token.key
                
            }
            return Response(data=response, status=status.HTTP_200_OK)

        else:
            response = {
                "status": False,
                "message": "Invalid User"
            }
            return Response(data=response, status=status.HTTP_401_UNAUTHORIZED)
        

# LIST ALL USER ACTIVITY
class UserActivityListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserActivitySerializer
    
    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = UserActivity.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        response = {
                    "status": True,
                    "message": "Valid request",
                    "activities" : serializer.data

                }
        return Response(response)
        


class UserRetrieveView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MobileUserSerializer
    queryset = MobileUser.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.request.user.id)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, format=None):
        serializer = MobileUserSerializer(request.user)
        response = {
                    "status": True,
                    "message": "User details",
                    "user" : serializer.data
                

                }
        return Response(data=response)