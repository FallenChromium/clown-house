from sqlmodel import create_engine
from authx import AuthX, AuthXConfig
import os
import dotenv

dotenv.load_dotenv()
POSTGRES_USER = os.environ.get("POSTGRES_USER")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
POSTGRES_DB = os.environ.get("POSTGRES_DB")
POSTGRES_HOST = os.environ.get("POSTGRES_HOST")
POSTGRES_PORT = os.environ.get("POSTGRES_PORT")


if POSTGRES_PASSWORD:
    engine = create_engine(url= "postgresql://%s:%s@%s:%s/%s" % (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB) , echo=True, future=True)
else:
    engine = create_engine(url= "postgresql://%s@%s:%s/%s" % (POSTGRES_USER, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB) , echo=True, future=True)

auth_config = AuthXConfig(
     JWT_ALGORITHM = "HS256",
     JWT_SECRET_KEY = "SECRET_KEY",
     JWT_TOKEN_LOCATION = ["headers"],
)
auth = AuthX(config=auth_config)
