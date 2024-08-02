# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.12.4
FROM python:${PYTHON_VERSION} as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ARG UID=10001
# RUN adduser \
#     --disabled-password \
#     --gecos "" \
#     --home "/nonexistent" \
#     --shell "/sbin/nologin" \
#     --no-create-home \
#     --uid "${UID}" \
#     appuser

COPY ./requirements.txt ./requirements.txt

RUN python -m pip install -r requirements.txt

WORKDIR /app

# USER appuser

COPY . .
COPY entrypoint.sh .

EXPOSE 8000

ENTRYPOINT ["sh", "./entrypoint.sh"]
