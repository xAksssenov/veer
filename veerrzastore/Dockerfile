FROM python:3.13-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apk update && apk add --no-cache \
  curl \
  gcc \
  musl-dev \
  libffi-dev \
  postgresql-dev \
  netcat-openbsd  # Добавлено для проверки соединения с БД

COPY requirements.txt .
RUN pip install --upgrade pip && \
  pip install -r requirements.txt gunicorn  # Добавлен Gunicorn

COPY . .

RUN mkdir -p /app/staticfiles

EXPOSE 8000