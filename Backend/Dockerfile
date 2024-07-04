FROM python:3.12-slim

ENV PYTHONBUFFERED 1

ENV PORT 8080

WORKDIR /app

COPY . /app/

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN python manage.py collectstatic --no-input

CMD gunicorn --bind 0.0.0.0:"${PORT}" justina_io_server.wsgi:application

EXPOSE ${PORT}