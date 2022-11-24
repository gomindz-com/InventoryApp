from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime

from .forms import LoginForm


class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(status=status.HTTP_201_CREATED, data={'status':'true','message':'success', 'result': serializer.data})
    
    

class Login(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()

        if user is None:
            return JsonResponse(status=status.HTTP_401_UNAUTHORIZED, data={'status':'false','message':'failure', 'result': {
            'message': 'User Not Found',
            }})

        if not user.check_password(password):
            return JsonResponse(status=status.HTTP_401_UNAUTHORIZED, data={'status':'false','message':'failure', 'result': {
            'message': 'Incorrect Password',
            }})

        payload = {

            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        userObject = {
            'name': user.firstname + ' ' + user.lastname,
            'email': user.email,
            'streetAddress': user.streetAddress,
            'postcode': user.postcode,
            'city': user.city,
            'region': user.region,
            'contact': user.contact,
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'message': 'success',
            'jwt': token
        }
        #return response
        return JsonResponse(status=status.HTTP_200_OK, data={'status':'true','message':'success', 'result': {
            'message': 'success',
            'jwt': token,
            'user': userObject
        }})
    



class AuthenticateUser(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

        serializer = UserSerializer(user)
        return Response(serializer.data)
    


class Logout(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success',
        }
        return response




def login_page(request):
    forms = LoginForm()
    if request.method == 'POST':
        forms = LoginForm(request.POST)
        if forms.is_valid():
            username = forms.cleaned_data['username']
            password = forms.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return redirect('dashboard')
    context = {'form': forms}
    return render(request, 'users/login.html', context)


def logout_page(request):
    logout(request)
    return redirect('login')
