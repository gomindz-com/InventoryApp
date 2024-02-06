from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer, CustomUserSerializer, UpdateUserProfileSerializer, UpdatePasswordSerializer, SubscriberSerializer, SubscriberUpdateSerializer, UserActivitySerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from django.contrib.auth import authenticate
from .models import CustomUser, UserActivity
from rest_framework.authtoken.models import Token
from django.contrib.auth.signals import user_logged_in


import logging
logger = logging.getLogger('app_api')


class RegisterUser(generics.CreateAPIView):
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()
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
    permission_classes = [AllowAny]
    def post(self, request: Request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            user_logged_in.send(sender=self.__class__, request=request, user=user)

            serializer = CustomUserSerializer(user)
            response = {
                "status": True,
                "message": "login Successful",
                "user": serializer.data,
                "token": user.auth_token.key
                
            }
            return Response(data=response, status=status.HTTP_200_OK)

        else:
            response = {
                "status": False,
                "message": "Invalid User"
            }
            return Response(data=response, status=status.HTTP_401_UNAUTHORIZED)


class AdminUser(APIView):
    permission_classes = [AllowAny]
    def post(self, request: Request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            if user.is_staff:
                serializer = CustomUserSerializer(user)
                if not hasattr(user, 'auth_token'):
                    Token.objects.create(user=user)
                response = {
                    "status": True,
                    "message": "Admin Login Successful",
                    "user": serializer.data,
                    "token": user.auth_token.key
                    
                }
                return Response(data=response, status=status.HTTP_200_OK)
            else:
                response = {
                    "status": False,
                    "message": "Invalid Admin"
                }
                return Response(data=response, status=status.HTTP_401_UNAUTHORIZED)

        else:
            response = {
                "status": False,
                "message": "Invalid Admin"
            }
            return Response(data=response, status=status.HTTP_401_UNAUTHORIZED)





class UserRetrieveView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.request.user.id)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, format=None):
        serializer = CustomUserSerializer(request.user)
        response = {
                    "status": True,
                    "message": "",
                    "user" : serializer.data
                

                }
        return Response(data=response)


    
class UserUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserProfileSerializer
    queryset = CustomUser.objects.all()
    http_method_names = ['get', 'patch', 'put']

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.request.user.id)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, format=None):
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        updateUserSerializer = UpdateUserProfileSerializer(data=request.data, context={'request': request})
        updateUserSerializer.is_valid(raise_exception=True)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        response = {
                    "status": True,
                    "message": "",
                    "user" : serializer.data
                }
        return Response(data=response)


       
class UserUpdatePasswordView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdatePasswordSerializer
    queryset = CustomUser.objects.all()
    
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.request.user.id)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, format=None):
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        updatePasswordSerializer = UpdatePasswordSerializer(data=request.data, context={'request': request})
        updatePasswordSerializer.is_valid(raise_exception=True)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        response = {
                    "status": True,
                    "message": "Successfully Updated",

                }
        return Response(data=response)
   



# LIST ALL SUBSCRIBERS
class SubscribersListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubscriberSerializer

    def get(self, request, *args, **kwargs):
        queryset = CustomUser.objects.filter(is_staff=False)
        serializer = self.get_serializer(queryset, many=True)
        response = {
                    "status": True,
                    "message": "Valid request",
                    "subscribers" : serializer.data

                }
        return Response(response)
        


# LIST DETAIL OF ONE SUBSCRIBER / UPDATE / DELETE
class SubscriberRetreiveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubscriberSerializer
    queryset = CustomUser.objects.filter(is_staff=False)

    def get_queryset(self):
        return CustomUser.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response = {
            "status": True,
            "message": "",
            "subscriber": serializer.data

                    }                
        return Response(data=response, status=status.HTTP_201_CREATED)





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
        
    