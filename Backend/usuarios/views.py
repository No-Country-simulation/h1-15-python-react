from mail.views import activation_mail
from core.models import User
from usuarios.serializers import UserSerializer, UserSerializerPatch
from rest_framework import generics
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView, TokenRefreshView
from usuarios.serializers import CustomTokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @extend_schema(
        tags=['Users'],
        summary='List all users',
        description="Returns a list of all users."
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


    @extend_schema(
        tags=['Users'],
        summary='Create a new user',
        description="Creates a new user and validates the email."
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserSerializerPatch
        return UserSerializer

    @extend_schema(
        tags=['Users'],
        summary='Retrieve a specific user',
        description="Returns the details of a user specified by their ID."
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Users'],
        summary='Update a user',
        description="Allows updating all the details of a user specified by their ID."
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Users'],
        summary='Delete a user',
        description="Deletes the user specified by their ID from the database."
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    @extend_schema(
        tags=['Users'],
        summary='Partial update of a user',
        description="Allows modifying certain details of the user specified by their ID."
    )
    def patch(self, request, *args, **kwargs):
        user = User.objects.get(id=kwargs['pk'])
        activation_mail(user.email, request.data['password'])
        user.first_login = False
        user.set_password(request.data['password'])
        print(user.password)
        user.save()
        return self.partial_update(request, *args, **kwargs)

@extend_schema(
    tags=['Authentication'],
    summary='Obtain authentication token',
    description="Authenticates a user and returns a JWT token."
)
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        """
        Handles user login and returns JWT tokens for authentication.
        """
        response = super().post(request, *args, **kwargs)
        data = response.data
        return Response(data, status=status.HTTP_200_OK)
    

@extend_schema(
    tags=['Authentication'],
    summary='Verify JWT Token',
    description='Verifies the authenticity of the provided JWT token.'
)
class CustomTokenVerifyView(TokenVerifyView):
    pass

@extend_schema(
    tags=['Authentication'],
    summary='Refresh JWT Token',
    description='Refreshes the JWT token by providing a valid refresh token.'
)
class CustomTokenRefreshView(TokenRefreshView):
    pass
