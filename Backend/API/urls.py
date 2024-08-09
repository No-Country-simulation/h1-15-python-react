from django.urls import path
from django.contrib import admin
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
from personal_medico.views import PersonalMedicoList, PersonalMedicoDetail, CalificaPersonalMedicoList
from trasplantes_cruzados.views import TrasplanteCruzadoList, TrasplanteCruzadoDetail
from especialidad.views import EspecialidadList, EspecialidadDetail
from medicamentos.views import MedicamentoDetail, MedicamentoListCreate
from tipo_documento.views import TipoDocumentoDetail, TipoDocumentoList
from antecedente_medico.views import AntecedenteMedicoDetail, AntecedenteMedicoList

from entidad.views import EntidadDetail, EntidadList
from turnos.views import DisponibilidadList, DisponibilidadCreate, TurnoCreate,DisponibilidadDetail, TurnoListView,   MisTurnoListView, ReservarTurnoView
from patologias.views import PatologiaList, PatologiaDetail
from farmacia.views import FarmaciaList, FarmaciaDetail
from usuarios.views import CustomTokenObtainPairView, CustomTokenVerifyView, CustomTokenRefreshView


urlpatterns = [
    # Admin route
    path('admin/', admin.site.urls),
    # Simple JWT API
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', CustomTokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    # DRF Spectacular URLs
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/doc/',
         SpectacularSwaggerView.as_view(url_name='schema'), name='doc'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    # API URLs
    path('users/', UserList.as_view()),
    path('users/<int:pk>/', UserDetail.as_view()),
    path('patient/', PacienteList.as_view(),),
    path('patient/<int:pk>/', PacienteDetail.as_view(),),
    path('personal_info/', InformacionPersonalList.as_view(),),
    path('personal_info/<int:pk>/', InformacionPersonalDetail.as_view(),),
    path('address/', DireccionList.as_view(),),
    path('address/<int:pk>/', DireccionDetail.as_view(),),
    path('financers/', FinanciadoresList.as_view(),),

    path('doctor/',  PersonalMedicoList.as_view(),),
    path('doctor/<int:pk>',PersonalMedicoDetail.as_view(),),
    path('doctor/<int:pk>/reviews/',CalificaPersonalMedicoList.as_view(),),

    path('availabilit/', DisponibilidadList.as_view(),),
    path('availabilit/create/', DisponibilidadCreate.as_view(),),
    path('availabilit/<int:pk>/',DisponibilidadDetail.as_view(),),

    path('appointment/create/', TurnoCreate.as_view(),), #crear el
    path('appointment/list/', TurnoListView.as_view()),
    #path('appointment/detail/<int:pk>/',TurnoDetail.as_view(),),
    #path('appointment/<int:pk>/', TurnoDetail.as_view(),),

    #path('my_appointment/', MisTurnoListView.as_view()), #es para buscar turnos
    #path('my_appointment/<int:pk>', ReservarTurnoView.as_view()), #es para reservar un turno

]

"""
path('treatment/', TratamientoList.as_view(),),
path('treatment/<int:pk>/', TratamientoDetail.as_view(),),
path('type/', TipoUsuarioList.as_view(),),
path('type/<int:pk>/', TipoUsuarioDetail.as_view(),),
path('financiadores/<int:pk>/',FinanciadoresDetail.as_view(),),
path('nomenclador/', NomencladorList.as_view(),),
path('nomenclador/<int:pk>/',NomencladorDetail.as_view(),),
path('nomenclador/upload/', FileUploadView.as_view(),),

path('crosstransplant/', TrasplanteCruzadoList.as_view(),),
path('crosstransplant/<int:pk>/', TrasplanteCruzadoDetail.as_view(),),


path('especialidad/', EspecialidadList.as_view(),),
path('especialidad/<int:pk>/',EspecialidadDetail.as_view(),),

path('medicamentos/', MedicamentoListCreate.as_view(),),
path('medicamentos/<int:pk>/',MedicamentoDetail.as_view(),),

path('tipo_documento/', TipoDocumentoList.as_view(),),
path('tipo_documento/<int:pk>/',TipoDocumentoDetail.as_view(),),

path('antecedente_medico/', AntecedenteMedicoList.as_view(),),
path('antecedente_medico/<int:pk>/',AntecedenteMedicoDetail.as_view(),),


path('entidad/', EntidadList.as_view(),),
path('entidad/<int:pk>/',EntidadDetail.as_view(),),



path('patologias/', PatologiaList.as_view(),),
path('patologias/<int:pk>/',PatologiaDetail.as_view(),),

path('farmacia/', FarmaciaList.as_view(),),
path('farmacia/<int:pk>/',FarmaciaDetail.as_view(),),


"""


