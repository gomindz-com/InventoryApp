from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics, mixins, viewsets, filters, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from django.contrib.auth import authenticate
from .models import CustomUser
from rest_framework.parsers import MultiPartParser, FormParser
import logging
logger = logging.getLogger('app_api')


class RegisterUser(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUser(APIView):
    permission_classes = [AllowAny]
    def post(self, request: Request):
        email = request.data.get('email')
        password = request.data.get('password')

        print(email)
        user = authenticate(email=email, password=password)

        if user is not None:
            serializer = CustomUserSerializer(user)

            response = {
                "status": True,
                "message": "login Successful",
                "user": serializer.data,
                "token": user.auth_token.key,
            }
            return Response(data=response, status=status.HTTP_200_OK)

        else:
            return Response(data={"message": "Invalid User"}, status=status.HTTP_200_OK)

    def get(self, request: Request):
        content = {
            "user": str(request.user),
            "auth": str(request.auth),
        }
        return Response(data=content, status=status.HTTP_200_OK)


class UserRetreiveUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    def get_queryset(self):
        user = self.request.user
        return CustomUser.objects.filter(id=user.id)

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(CustomUser, email=item)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

