from django.urls import path
from usuarios.views import UserList, UserDetail

# Create your views here.
urlpatterns = [
  path('users/', UserList.as_view()),
  path('users/<int:pk>/', UserDetail.as_view()),
]