from django.urls import path
from .views import health, process_tool

urlpatterns = [
    path("health/", health, name="health"),
    path("tools/<slug:tool_slug>/process/", process_tool, name="process-tool"),
]

