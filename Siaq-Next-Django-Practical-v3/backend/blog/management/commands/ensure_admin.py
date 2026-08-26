import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "إنشاء حساب الإدارة من متغيرات البيئة عند عدم وجوده"

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "").strip()
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "").strip()
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "").strip()
        if not username or not password:
            self.stdout.write("Admin credentials are not configured; skipping.")
            return

        user_model = get_user_model()
        user, created = user_model.objects.get_or_create(username=username, defaults={"email": email})
        if created:
            user.is_staff = True
            user.is_superuser = True
            user.set_password(password)
            user.save(update_fields=["email", "is_staff", "is_superuser", "password"])
            self.stdout.write(self.style.SUCCESS("Admin account created."))
            return

        changed = False
        if not user.is_staff or not user.is_superuser:
            user.is_staff = True
            user.is_superuser = True
            changed = True
        if email and user.email != email:
            user.email = email
            changed = True
        if changed:
            user.save()
        self.stdout.write("Admin account already exists.")
