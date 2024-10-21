from django.test import TestCase
from django.urls import reverse


class HealthCheckTest(TestCase):
    def test_health_check(self):
        response = self.client.get(reverse('health_check'))
        self.assertEqual(response.status_code, 200)
        expected_data = {
            'status': 'healthy',
            'database': 'healthy'
        }
        self.assertJSONEqual(response.content, expected_data)
