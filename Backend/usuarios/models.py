

# Create your models here.

# class User(AbstractUser):
#     username = models.CharField(max_length=150, unique=True)
#     email = models.EmailField(max_length=254, unique=True)
#     password = models.CharField(max_length=128)
#     first_name = models.CharField(max_length=150)
#     last_name = models.CharField(max_length=150)
#     last_login = models.DateTimeField()
#     date_joined = models.DateTimeField(auto_now_add=True)

#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     is_superuser = models.BooleanField(default=False)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username',]

#     def __str__(self):
#         return self.email