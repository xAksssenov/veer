FROM python:3.13-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apk update && apk add --no-cache \
  gcc \
  musl-dev \
  libffi-dev \
  postgresql-dev  # Добавлено для PostgreSQL

COPY requirements.txt .
RUN pip install --upgrade pip && \
  pip install -r requirements.txt

COPY . .

CMD ["sh", "-c", "\
  echo 'Waiting for PostgreSQL...' && \
  while ! nc -z db 5432; do sleep 1; done && \
  echo 'Applying migrations...' && \
  python manage.py migrate && \
  echo 'Starting server...' && \
  python manage.py runserver 0.0.0.0:8000\
  "]