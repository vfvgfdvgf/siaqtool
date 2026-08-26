FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=10000

RUN apt-get update && apt-get install -y --no-install-recommends \
    ghostscript qpdf tesseract-ocr tesseract-ocr-ara tesseract-ocr-eng \
    libreoffice-core libreoffice-common libreoffice-writer libreoffice-calc libreoffice-impress \
    fonts-noto-core fonts-noto-extra fonts-dejavu-core libcairo2 libpango-1.0-0 libpangocairo-1.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

<<<<<<< HEAD
RUN python manage.py collectstatic --noinput

RUN adduser --disabled-password --gecos "" --uid 10001 siaq && chown -R siaq:siaq /app
USER siaq
EXPOSE 10000
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py ensure_admin && python manage.py seed_articles && gunicorn siaq_api.wsgi:application --bind 0.0.0.0:${PORT} --workers 1 --threads 2 --timeout 420 --graceful-timeout 120 --access-logfile -"]
=======
RUN adduser --disabled-password --gecos "" --uid 10001 siaq && chown -R siaq:siaq /app
USER siaq
EXPOSE 10000
CMD ["sh", "-c", "gunicorn siaq_api.wsgi:application --bind 0.0.0.0:${PORT} --workers 1 --threads 2 --timeout 420 --graceful-timeout 120 --access-logfile -"]
>>>>>>> 7c02a53d332ebcf3c6c714e955d1d83dfd1aab40
