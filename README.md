Docker

Primero debemos tener descargado Docker en nuestro pc y tener Docker Desktop corriendo.

Solo la primera vez que corremos el contenedor debemos construirlo con

```
docker compose build
```

luego correr el contenedor con el comando

```
docker compose up
```

Direcciones para pruebas

http://localhost/api/ ---> API

http://localhost/ ---> frontend

http://localhost:8080/ ---> phpMyAdmin

http://localhost/api/ ---> backend por nginx

http://localhost:8000/ ---> backend por gunicorn
