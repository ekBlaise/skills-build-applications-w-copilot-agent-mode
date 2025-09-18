"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os

from django.contrib import admin
from django.urls import path, include

# Codespace base URL (used for constructing absolute API links in this project)
codespace_name = os.environ.get('CODESPACE_NAME')
codespace_base = f"https://{codespace_name}-8000.app.github.dev" if codespace_name else None


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('octofit_tracker.api_urls')),
]
