# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.12.4
FROM python:${PYTHON_VERSION} AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN --mount=type=cache,id=base,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

WORKDIR /app

COPY . .
COPY entrypoint.sh .

EXPOSE 8000

ENTRYPOINT ["sh", "./entrypoint.sh"]
