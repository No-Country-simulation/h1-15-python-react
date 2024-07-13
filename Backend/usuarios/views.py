from django.contrib.auth import get_user_model
from django.http import HttpResponse
from usuarios.serializers import UserSerializer
from rest_framework import generics, permissions


User = get_user_model()

# Create your views here.
class UserList(generics.ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

  def get(self, request, *args, **kwargs):
    return super().get(request, *args, **kwargs)

  def post(self, request, *args, **kwargs):
      return self.create(request, *args, **kwargs)
  

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

  def get(self, request, *args, **kwargs):
    return super().get(request, *args, **kwargs)
  
  def put(self, request, *args, **kwargs):
    return super().put(request, *args, **kwargs)
  
  def delete(self, request, *args, **kwargs):
    return super().delete(request, *args, **kwargs)
  
  def patch(self, request, *args, **kwargs):
    return super().patch(request, *args, **kwargs)