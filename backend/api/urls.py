from django.urls import path
from .views import analyze_area, download_dataset

urlpatterns = [
    path("query/", analyze_area),
    path("download/", download_dataset),
]
