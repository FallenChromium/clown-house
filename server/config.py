from sqlmodel import create_engine
import os
import dotenv

dotenv.load_dotenv()
POSTGRES_USER = os.environ.get("POSTGRES_USER")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
POSTGRES_DB = os.environ.get("POSTGRES_DB")
POSTGRES_HOST = os.environ.get("POSTGRES_HOST")
POSTGRES_PORT = os.environ.get("POSTGRES_PORT")


if POSTGRES_PASSWORD:
    engine = create_engine(url= f"postgresql://%s:%s@%s:%s/%s" % (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB) , echo=True, future=True)
else:
    engine = create_engine(url= f"postgresql://%s@%s:%s/%s" % (POSTGRES_USER, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB) , echo=True, future=True)
