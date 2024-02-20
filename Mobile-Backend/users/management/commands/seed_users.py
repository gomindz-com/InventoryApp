# management/commands/seed_users.py
from django.core.management.base import BaseCommand
from users.seeder import seed_users

class Command(BaseCommand):
    help = 'Seed the database with dummy user data'

    def add_arguments(self, parser):
        parser.add_argument('--count', type=int, default=10, help='Number of users to create')

    def handle(self, *args, **options):
        count = options['count']
        seed_users(num_users=count)
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {count} users'))
