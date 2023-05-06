from sqlmodel import Field, SQLModel, Session, select
from typing import Optional

class CityEventType(SQLModel, table=True):
    __tablename__ : str = "city_event_types"
    id : Optional[int] = Field(default=None, primary_key=True)
    EventTypeName : str

from sqlmodel import Field, SQLModel, Session, select
from typing import Optional, Union
from fastapi import APIRouter, HTTPException
from config import engine
from sqlalchemy.exc import NoResultFound

router = APIRouter()

@router.get("/event_types/{item_id}")
def read_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityEventType).where(CityEventType.id == item_id)
        try:
            obj = session.exec(query).one()
            return obj
        except NoResultFound:
            raise HTTPException(status_code=404, detail="Item not found")
    

@router.get("/event_types")
def read_objects(q: Union[str, None] = None):
    with Session(engine) as session:
        statement = select(CityEventType)
        result = session.exec(statement)
        return result.all()

@router.delete("/event_types/{item_id}")
def delete_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityEventType).where(CityEventType.id == item_id)
        try:
            obj = session.exec(query).one()
            session.delete(obj)
            session.commit()
        except NoResultFound as e:
            raise HTTPException(status_code=404, detail="Item not found")
    
@router.post("/event_types")
def create_object(entry: CityEventType):
    with Session(engine) as session:
        session.add(entry)
        session.commit()
        return entry.id

@router.patch("/event_types/{item_id}")
def update_object(item_id: int, updated_object: CityEventType, q: Union[str, None] = None):
    with Session(engine) as session:
            obj = session.get(CityEventType, item_id)
            if obj is None:
                raise HTTPException(status_code=404, detail="Item not found")
            else:
                updated_data = updated_object.dict(exclude_unset=True)
                for key, value in updated_data.items():
                    setattr(obj, key, value)
                session.add(obj)
                session.commit()
                session.refresh(obj)
                return obj



