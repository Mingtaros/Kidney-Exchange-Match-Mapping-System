from environs import Env


env = Env()
env.read_env() # read .env file, if it exists


def get_env(environment_name):
  return env(environment_name)

def get_postgre_env():
  # get the environment from .env file

  return {
    "DB_NAME": env("POSTGRE_DB_NAME"),
    "USERNAME": env("POSTGRE_USERNAME"),
    "PASSWORD": env("POSTGRE_PASSWORD"),
    "HOST": env("POSTGRE_HOST"),
    "PORT": env("POSTGRE_PORT"),
  }

# CONSTANTS TO BE USED SOMEWHERE ELSE
POSTGRE_ENV = get_postgre_env()
DONOR_RECIPIENT_TABLE_NAME = get_env("DONOR_RECIPIENT_TABLE_NAME")