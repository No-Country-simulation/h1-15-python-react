from django.urls import path
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

# Urls for the API endpoints
from usuarios.views import UserList, UserDetail
from tratamientos.views import TratamientoList, TratamientoDetail
from informacion_personal.views import InformacionPersonalList, InformacionPersonalDetail
from financiadores.views import FinanciadoresList, FinanciadoresDetail
from nomencladores.views import NomencladorList, NomencladorDetail, FileUploadView
from pacientes.views import PacienteList, PacienteDetail
from tipo_usuario.views import TipoUsuarioList, TipoUsuarioDetail
from direcciones.views import DireccionList, DireccionDetail
from trasplantes_cruzados.views import TrasplanteCruzadoList, TrasplanteCruzadoDetail


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
    path('personal/', InformacionPersonalList.as_view(),),
    path('personal/<int:pk>/', InformacionPersonalDetail.as_view(),),
    path('patient/', PacienteList.as_view(),),
    path('patient/<int:pk>/', PacienteDetail.as_view(),),
    path('type/', TipoUsuarioList.as_view(),),
    path('type/<int:pk>/', TipoUsuarioDetail.as_view(),),
    path('address/', DireccionList.as_view(),),
    path('address/<int:pk>/', DireccionDetail.as_view(),),
    path('financiadores/', FinanciadoresList.as_view(),),
    path('financiadores/<int:pk>/',FinanciadoresDetail.as_view(),),
    path('nomenclador/', NomencladorList.as_view(),),
    path('nomenclador/<int:pk>/',NomencladorDetail.as_view(),),
    path('nomenclador/upload/', FileUploadView.as_view(),),
    path('crosstransplant/', TrasplanteCruzadoList.as_view(),),
    path('crosstransplant/<int:pk>/', TrasplanteCruzadoDetail.as_view(),),
]
#f1g2s3