
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
import os

from .models import Team, UserProfile, Activity, Workout, LeaderboardEntry
from .serializers import (
    TeamSerializer,
    UserProfileSerializer,
    ActivitySerializer,
    WorkoutSerializer,
    LeaderboardEntrySerializer,
)


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer


class LeaderboardEntryViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.all()
    serializer_class = LeaderboardEntrySerializer


@api_view(['GET'])
def api_root(request, format=None):
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base_url = f"https://{codespace_name}-8000.app.github.dev/api/"
    else:
        # fallback to request host
        base_url = request.build_absolute_uri('/api/')
    return Response(
        {
            'teams': base_url + 'teams/',
            'users': base_url + 'users/',
            'activities': base_url + 'activities/',
            'workouts': base_url + 'workouts/',
            'leaderboard': base_url + 'leaderboard/',
        }
    )
