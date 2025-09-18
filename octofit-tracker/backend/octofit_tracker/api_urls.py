import os
from rest_framework import routers
from django.urls import path, include
from rest_framework.response import Response
from django.http import HttpRequest
from .views import (
    TeamViewSet,
    UserProfileViewSet,
    ActivityViewSet,
    WorkoutViewSet,
    LeaderboardEntryViewSet,
    api_root,
)

router = routers.DefaultRouter()
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'users', UserProfileViewSet, basename='userprofile')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'workouts', WorkoutViewSet, basename='workout')
router.register(r'leaderboard', LeaderboardEntryViewSet, basename='leaderboardentry')

def codespace_api_root(request: HttpRequest, format=None):
    # Build absolute URLs using CODESPACE_NAME if available to match the Codespaces URL format
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        base = f"https://{codespace}-8000.app.github.dev"
    else:
        # Fall back to the request host
        base = f"{request.scheme}://{request.get_host()}"

    return Response(
        {
            'teams': f"{base}/api/teams/",
            'users': f"{base}/api/users/",
            'activities': f"{base}/api/activities/",
            'workouts': f"{base}/api/workouts/",
            'leaderboard': f"{base}/api/leaderboard/",
        }
    )


urlpatterns = [
    path('', codespace_api_root, name='api-root'),
    path('api/', include(router.urls)),
]
