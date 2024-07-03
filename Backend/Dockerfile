FROM python:3.12-slim

WORKDIR /app

COPY . /app/

RUN pip install -r requirements.txt

RUN python manage.py migrate

RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "justina_io_server.wsgi:application"]

EXPOSE 8000