from django.urls import path
from django.contrib import admin
from usuarios.views import UserList, UserDetail
from tratamientos.views import TratamientoList, TratamientoDetail
from financiadores.views import FinanciadoresList, FinanciadoresDetail
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


# Create your views here.
urlpatterns = [
    # Admin route
    path('admin/', admin.site.urls),
    # Simple JWT API
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # DRF Spectacular URLs
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/doc/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='doc'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    # API URLs
    path('users/', UserList.as_view()),
    path('users/<int:pk>/', UserDetail.as_view()),
    path('treatment/', TratamientoList.as_view(),),
    path('treatment/<int:pk>/', TratamientoDetail.as_view(),),
    path('financiadores/', FinanciadoresList.as_view(),),
    path('financiadores/<int:pk>/',FinanciadoresDetail.as_view(),),
    #path('financiadores/upload/', FileUploadView.as_view(),),
]
