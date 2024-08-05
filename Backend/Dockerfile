# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.12.4
FROM python:${PYTHON_VERSION} as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

ENV DJANGO_SETTINGS_MODULE="justina_io_server.settings.production"
ENV DJANGO_SECRET_KEY="fzhy__wwp1lz3$kpemha-r30sy4pñep7p664%4vaf_hhy*3&&hvtuq5w"
ENV DJANGO_SUPERUSER_PASSWORD="my_secret_admin_pass"
ENV DB_NAME="railway"
ENV DB_USER="root"
ENV DB_PASSWORD="fJHPRoYkkQsROsywDgChOcqTxIdXspiN"
ENV DB_HOST="mysql://root:fJHPRoYkkQsROsywDgChOcqTxIdXspiN@monorail.proxy.rlwy.net:53742/railway"
ENV DB_PORT=3306
ENV DJANGO_EMAIL_HOST="sandbox.smtp.mailtrap.io"
ENV DJANGO_EMAIL_HOST_USER="d49267ffec38e7"
ENV DJANGO_EMAIL_HOST_PASSWORD="9df6336f3a2435"
ENV DJANGO_EMAIL_PORT=2525

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt

WORKDIR /app

USER appuser

COPY . .
COPY entrypoint.sh .

EXPOSE 8000

ENTRYPOINT ["sh", "./entrypoint.sh"]
