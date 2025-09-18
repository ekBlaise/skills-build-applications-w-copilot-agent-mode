from django.test import TestCase
from django.urls import reverse


class ApiRootTests(TestCase):
    def test_api_root_exists(self):
        resp = self.client.get('/')
        self.assertIn(resp.status_code, (200, 302))
