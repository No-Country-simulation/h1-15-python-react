from django.urls import path
from django.contrib import admin
from usuarios.views import UserList, UserDetail
from tratamientos.views import TratamientoList, TratamientoDetail
from financiadores.views import FinanciadoresList, FinanciadoresDetail
from nomencladores.views import NomencladorList, NomencladorDetail, FileUploadView
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

# Urls for the API endpoints
from usuarios.views import UserList, UserDetail
from tratamientos.views import TratamientoList, TratamientoDetail
from informacion_personal.views import InformacionPersonalList, InformacionPersonalDetail
from pacientes.views import PacienteList, PacienteDetail
from tipo_usuario.views import TipoUsuarioList, TipoUsuarioDetail
from direcciones.views import DireccionList, DireccionDetail
from personal_medico.views import PersonalMedicoList, PersonalMedicoDetail
from especialidad.views import EspecialidadList, EspecialidadDetail
from medicamentos.views import MedicamentoDetail, MedicamentoList
from tipo_documento.views import TipoDocumentoDetail, TipoDocumentoList
from antecedente_medico.views import AntecedenteMedicoDetail, AntecedenteMedicoList
from historia_clinica.views import HistoriaClinicaDetail, HistoriaClinicaList
from entidad.views import EntidadDetail, EntidadList
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
    path('doctor/',  PersonalMedicoList.as_view(),),
    path('doctor/<int:pk>',PersonalMedicoDetail.as_view(),),

    path('especialidad/', EspecialidadList.as_view(),),
    path('especialidad/<int:pk>',EspecialidadDetail.as_view(),),

    path('medicametnos/', MedicamentoList.as_view(),),
    path('medicametnos/<int:pk>',MedicamentoDetail.as_view(),),

    path('tipo_documento/', TipoDocumentoList.as_view(),),
    path('tipo_documento/<int:pk>',TipoDocumentoDetail.as_view(),),
    
    path('antecedente_medico/', AntecedenteMedicoList.as_view(),),
    path('antecedente_medico/<int:pk>',AntecedenteMedicoDetail.as_view(),),

    path('historia_clinica/', HistoriaClinicaList.as_view(),),
    path('historia_clinica/<int:pk>',HistoriaClinicaDetail.as_view(),),

    path('entidad/', EntidadList.as_view(),),
    path('entidad/<int:pk>',EntidadDetail.as_view(),),
]
