from handlers.CityEventType import CityEventType
from handlers.CityObject import CityObject
from sqlmodel import Field, SQLModel, create_engine, Session, select
from typing import List, Optional, Union
from datetime import date
from config import engine

class CityEventModel(SQLModel):

    id: Optional[int] = Field(default=None, primary_key=True)
    EventTypeId : int = Field(foreign_key="city_event_types.id")
    Date : date
    EventName : str
    CityObjectId : int = Field(foreign_key="city_objects.id")

class CityEvent(CityEventModel, table=True):
    __tablename__: str = "city_events"

class CityEventReadModel(CityEventModel):
    ObjectName: str
    EventTypeName: str

from sqlmodel import Field, SQLModel, Session, select
from typing import Optional, Union
from datetime import date
from fastapi import APIRouter, HTTPException
from config import engine
from sqlalchemy.exc import NoResultFound

router = APIRouter()


@router.get("/events/{item_id}", response_model=CityEventModel)
def read_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityEvent).where(CityEvent.id == item_id)
        try:
            obj = session.exec(query).one()
            return obj
        except NoResultFound:
            raise HTTPException(status_code=404, detail="Item not found")
    

@router.get("/events", response_model=List[CityEventReadModel])
def read_objects(events_since: date | None = None, events_till: date | None = None):
    with Session(engine) as session:
        columns = [CityEvent.id, CityEvent.EventTypeId, CityEvent.Date, CityEvent.Date, CityEvent.EventName, CityEvent.CityObjectId, CityEventType.EventTypeName, CityObject.ObjectName]
        statement = select(*columns).join(CityObject).join(CityEventType)
        if events_since is not None:
            statement = statement.where(CityEvent.Date >= events_since)
        if events_till is not None:
            statement = statement.where(CityEvent.Date <= events_till)
        objects = session.exec(statement).all()

        return objects
    
@router.get("/events_raw", response_model=List[CityEventModel])
def read_objects_raw(q: Union[str, None] = None):
    with Session(engine) as session:
        statement = select(CityEvent)
        result = session.exec(statement)
        return result.all()

@router.delete("/events/{item_id}")
def delete_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityEvent).where(CityEvent.id == item_id)
        try:
            obj = session.exec(query).one()
            session.delete(obj)
            session.commit()
        except NoResultFound as e:
            raise HTTPException(status_code=404, detail="Item not found")
    
@router.post("/events")
def create_object(entry: CityEvent):
    with Session(engine) as session:
        session.add(entry)
        session.commit()
        return entry.id

@router.patch("/events/{item_id}", response_model=CityEventModel)
def update_object(item_id: int, updated_object: CityEvent, q: Union[str, None] = None):
    with Session(engine) as session:
            obj = session.get(CityEvent, item_id)
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
