from django.urls import path
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

# Urls for the API endpoints
from usuarios.views import UserList, UserDetail
from tratamientos.views import TreatmentList, TreatmentDetail, TreatAdherenceCreate, TreatAdherenceDetail, MyTreatAdherenceDetail
from informacion_personal.views import InformacionPersonalList, InformacionPersonalDetail, MyInformacionPersonalList
from financiadores.views import FinanciadoresList, FinanciadoresDetail
from nomencladores.views import NomencladorList, NomencladorDetail, FileUploadView
from pacientes.views import PacienteList, PacienteDetail, Verify_user
from tipo_usuario.views import TipoUsuarioList, TipoUsuarioDetail
from direcciones.views import DireccionList, DireccionDetail
from personal_medico.views import PersonalMedicoList, PersonalMedicoDetail, CalificaPersonalMedicoList
from trasplantes_cruzados.views import TrasplanteCruzadoList, TrasplanteCruzadoDetail
from especialidad.views import EspecialidadList, EspecialidadDetail
from medicamentos.views import MedicationDetail, MedicationListCreate
from tipo_documento.views import TipoDocumentoDetail, TipoDocumentoList
from antecedente_medico.views import AntecedenteMedicoDetail, AntecedenteMedicoList
from historia_clinica.views import ClinicalHistoryDetail, ClinicalHistoryList
from entidad.views import EntidadDetail, EntidadList
from patologias.views import PathologyList, PathologyDetail
from turnos.views import DisponibilidadList, DisponibilidadCreate, TurnoCreate,DisponibilidadDetail, TurnoListView,   MisTurnoListView, ReservarTurnoView
from farmacia.views import PharmacyList, PharmacyDetail
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
    path('patient/verify_user/', Verify_user.as_view(),),

    path('personal_info/', InformacionPersonalList.as_view(),),
    path('personal_info/<int:pk>/', InformacionPersonalDetail.as_view(),),
    path('personal_info/my/', MyInformacionPersonalList.as_view(),),

    path('address/', DireccionList.as_view(),),
    path('address/<int:pk>/', DireccionDetail.as_view(),),
    
    path('financers/', FinanciadoresList.as_view(),),
    
    path('treatment/', TreatmentList.as_view(),),
    path('treatment/<int:pk>/', TreatmentDetail.as_view(),),
    
    path('treat_adherence/', TreatAdherenceCreate.as_view(),),
    path('treat_adherence/<int:pk>/', TreatAdherenceDetail.as_view(),),
    path('treat_adherence/my/', MyTreatAdherenceDetail.as_view(),),
    
    path('pathologies/', PathologyList.as_view(),),
    path('pathologies/<int:pk>/',PathologyDetail.as_view(),),
    
    path('medications/', MedicationListCreate.as_view(),),
    path('medications/<int:pk>/',MedicationDetail.as_view(),),

    path('doctor/',  PersonalMedicoList.as_view(),),
    path('doctor/<int:pk>',PersonalMedicoDetail.as_view(),),
    path('doctor/<int:pk>/reviews/',CalificaPersonalMedicoList.as_view(),),
    
    path('specialty/', EspecialidadList.as_view(),),

    path('availabilit/', DisponibilidadList.as_view(),),
    path('availabilit/create/', DisponibilidadCreate.as_view(),),
    path('availabilit/<int:pk>/',DisponibilidadDetail.as_view(),),

    path('appointment/create/', TurnoCreate.as_view(),), #crear el
    path('appointment/list/', TurnoListView.as_view()),
    #path('appointment/detail/<int:pk>/',TurnoDetail.as_view(),),
    #path('appointment/<int:pk>/', TurnoDetail.as_view(),),

    #path('my_appointment/', MisTurnoListView.as_view()), #es para buscar turnos
    #path('my_appointment/<int:pk>', ReservarTurnoView.as_view()), #es para reservar un turno
    path('entity/', EntidadList.as_view(),),

    path('medical_history/', AntecedenteMedicoList.as_view(),),
    path('medical_history/<int:pk>/',AntecedenteMedicoDetail.as_view(),),

    path('clinical_history/', ClinicalHistoryList.as_view(),),
    path('clinical_history/<int:pk>/',ClinicalHistoryDetail.as_view(),),

    path('document_type/', TipoDocumentoList.as_view(),),
    
    path('pharmacy/', PharmacyList.as_view(),),
    path('pharmacy/<int:pk>/',PharmacyDetail.as_view(),),
]

"""

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



path('tipo_documento/', TipoDocumentoList.as_view(),),
path('tipo_documento/<int:pk>/',TipoDocumentoDetail.as_view(),),





path('entidad/<int:pk>/',EntidadDetail.as_view(),),








"""


