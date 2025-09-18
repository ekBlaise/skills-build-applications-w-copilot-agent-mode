from django.core.management.base import BaseCommand
from django.db import transaction
from octofit_tracker.models import Team, UserProfile, Activity, Workout, LeaderboardEntry
from django.conf import settings

import pymongo


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write('Starting population of octofit_db...')

        # Clear existing data. Use pymongo to delete documents directly by table/collection
        # because deleting via the ORM can fail if stored documents have mismatched PK types.
        self.stdout.write('Deleting existing data via pymongo (safer for mixed PK types)...')
        try:
            client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
            db = client[settings.DATABASES['default']['NAME']]
            models = [Activity, Workout, LeaderboardEntry, UserProfile, Team]
            for m in models:
                coll_name = m._meta.db_table
                self.stdout.write(f'Clearing collection: {coll_name}')
                db[coll_name].delete_many({})
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Pymongo deletion failed, falling back to ORM deletes: {e}'))
            self.stdout.write('Attempting ORM deletes...')
            Activity.objects.all().delete()
            Workout.objects.all().delete()
            LeaderboardEntry.objects.all().delete()
            UserProfile.objects.all().delete()
            Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel', description='Marvel super team')
        dc = Team.objects.create(name='DC', description='DC super team')

        # Create users (super heroes)
        heroes = [
            {'email': 'spiderman@marvel.test', 'first_name': 'Peter', 'last_name': 'Parker', 'team': marvel},
            {'email': 'ironman@marvel.test', 'first_name': 'Tony', 'last_name': 'Stark', 'team': marvel},
            {'email': 'batman@dc.test', 'first_name': 'Bruce', 'last_name': 'Wayne', 'team': dc},
            {'email': 'superman@dc.test', 'first_name': 'Clark', 'last_name': 'Kent', 'team': dc},
        ]

        users = []
        for h in heroes:
            u = UserProfile.objects.create(email=h['email'], first_name=h['first_name'], last_name=h['last_name'], team=h['team'])
            users.append(u)

        # Activities
        Activity.objects.create(user=users[0], name='Running', duration_minutes=30, calories=300)
        Activity.objects.create(user=users[1], name='Cycling', duration_minutes=45, calories=500)
        Activity.objects.create(user=users[2], name='Swimming', duration_minutes=60, calories=700)
        Activity.objects.create(user=users[3], name='Weightlifting', duration_minutes=40, calories=400)

        # Workouts
        Workout.objects.create(user=users[0], title='Daily cardio', description='Quick cardio routine')
        Workout.objects.create(user=users[1], title='Power session', description='Strength and conditioning')

        # Leaderboard
        LeaderboardEntry.objects.create(user=users[0], score=1200, rank=2)
        LeaderboardEntry.objects.create(user=users[1], score=1500, rank=1)
        LeaderboardEntry.objects.create(user=users[2], score=900, rank=4)
        LeaderboardEntry.objects.create(user=users[3], score=1000, rank=3)

        self.stdout.write('Test data created via Django ORM.')

        # Ensure unique index on user email using pymongo directly on the correct collection name
        try:
            client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
            db = client[settings.DATABASES['default']['NAME']]
            user_coll = UserProfile._meta.db_table
            db[user_coll].create_index([('email', pymongo.ASCENDING)], unique=True)
            self.stdout.write(f'Created unique index on {user_coll}.email')
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Could not create unique index via pymongo: {e}'))

        self.stdout.write(self.style.SUCCESS('Population complete.'))
