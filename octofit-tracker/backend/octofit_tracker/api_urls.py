from rest_framework import routers
from django.urls import path, include
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

urlpatterns = [
    path('', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
