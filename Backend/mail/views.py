from django.http import HttpResponse
from django.core.mail import send_mail

# Create your views here.
def registration_mail(destination_mail, password):
  send_mail(
    subject="Contraseña provisoria", 
    message="Se ha creado la contraseña provisoria "+ password +" asociada a su cuenta, favor cámbiela para activar su usuario", 
    from_email="registro@justina-io.com", 
    recipient_list=[destination_mail]
    )
  pass

def activation_mail(destination_mail, password):
  send_mail(
    subject="Activación de cuenta", 
    message="Se ha activado su cuenta con éxito, por favor active su cuenta para poder iniciar sesión, su nueva contraseña es "+ password,
    from_email="activacion@justina-io.com", 
    recipient_list=[destination_mail]
    )
  pass