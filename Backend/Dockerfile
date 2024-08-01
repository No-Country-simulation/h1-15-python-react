# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.12.4
FROM python:${PYTHON_VERSION} AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt requirements.txt

RUN python -m pip install -r requirements.txt


COPY . .
COPY entrypoint.sh .

EXPOSE 8000

ENTRYPOINT ["sh", "./entrypoint.sh"]
