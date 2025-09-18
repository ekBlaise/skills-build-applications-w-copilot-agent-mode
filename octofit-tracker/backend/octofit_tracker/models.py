from django.db import models
from djongo.models import ObjectIdField


class Team(models.Model):
    id = ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    id = ObjectIdField(primary_key=True, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    team = models.ForeignKey(Team, null=True, blank=True, on_delete=models.SET_NULL, related_name='members')

    def __str__(self):
        return self.email


class Activity(models.Model):
    id = ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='activities')
    name = models.CharField(max_length=200)
    duration_minutes = models.IntegerField()
    calories = models.IntegerField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.name}"


class Workout(models.Model):
    id = ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='workouts')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class LeaderboardEntry(models.Model):
    id = ObjectIdField(primary_key=True, editable=False)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='leaderboard_entries')
    score = models.IntegerField(default=0)
    rank = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.score}"
