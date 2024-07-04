import os

def get_secret(secret_id, backup=None):
  return os.getenv(secret_id, backup)


# Keep this file at the end
if get_secret('PIPELINE') == 'production':
  from justina_io_server.settings.production import *
else:
  from justina_io_server.settings.development import *