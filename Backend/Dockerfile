# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.12.4
FROM python:${PYTHON_VERSION} AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt requirements.txt

RUN python -m pip install -r requirements.txt

WORKDIR /app

COPY . .
COPY entrypoint.sh .

EXPOSE 8000

ENTRYPOINT ["sh", "./entrypoint.sh"]

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
