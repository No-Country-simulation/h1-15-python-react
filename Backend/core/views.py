from django.http import HttpResponse
from django.db import connection

# Create your views here.
def health_check(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            one = cursor.fetchone()[0]
            if one != 1:
                raise Exception("La consulta a la base de datos falló")
        
        return HttpResponse("OK", status=200)
    except Exception as e:
        return HttpResponse(str(e), status=500)