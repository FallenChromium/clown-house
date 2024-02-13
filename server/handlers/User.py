from sqlmodel import Field, SQLModel, Session, select
from config import engine, auth
from fastapi import APIRouter, HTTPException, Form
from sqlalchemy.exc import NoResultFound
from typing import Annotated

from utils.crypto import verify, hash
 # Database models
class User(SQLModel, table=True):
    __tablename__ : str = "users"
    id: int = Field(default=None, primary_key=True)
    username: str
    password: str

router = APIRouter()

@router.post('/api/login')
def login(username: Annotated[str, Form()], password: Annotated[str, Form()]):
     with Session(engine) as session:
        query = select(User).where(User.username == username)
        try:
            obj: User = session.exec(query).one()
            if (verify(password, obj.password)):
                token = auth.create_access_token(uid=username)
                return {"access_token": token}
            else: 
                raise HTTPException(401, detail={"message": "Invalid credentials"})
        except NoResultFound:
            raise HTTPException(401, detail={"message": "Invalid credentials"})

@router.post('/api/register')
def register(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    with Session(engine) as session:
        session.add(User(username=username, password=hash(password)))
        session.commit()