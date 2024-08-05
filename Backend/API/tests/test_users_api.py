from rest_framework.test import APITestCase

# Create your tests here.

class UsersApiTests(APITestCase):

  def setUp(self) -> None:
    self.client.post(
            '/user/', {'username': 'test', 'email': 'test@test.com'}, format='json') 
  
  def test_create_user(self):
    pass