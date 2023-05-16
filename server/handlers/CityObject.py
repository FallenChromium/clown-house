from sqlmodel import Field, SQLModel, Session, select, Relationship, between
from typing import List, Optional, Union
from datetime import date
from fastapi import APIRouter, HTTPException
from config import engine
from sqlalchemy.exc import NoResultFound
from handlers.CityObjectOwner import CityObjectOwner

from handlers.CityObjectType import CityObjectType

router = APIRouter()
class CityObjectModel(SQLModel):
    id : int | None = Field(default=None, primary_key=True)
    ObjectTypeId : int = Field(default=None, foreign_key="city_object_types.id")
    Address : str   
    ObjectName: str
    Capacity : int
    OwnerId : int = Field(default=None, foreign_key="city_object_owners.id")
    DateOpened : date
    PeriodStart : date
    PeriodEnd : date

class CityObject(CityObjectModel, table=True):
    __tablename__: str = "city_objects"

class CityObjectReadModel(CityObjectModel):
    OwnerName: str
    ObjectTypeName: str


@router.get("/objects/{item_id}", response_model=CityObject)
def read_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityObject).where(CityObject.id == item_id)
        try:
            obj = session.exec(query).one()
            return obj
        except NoResultFound:
            raise HTTPException(status_code=404, detail="Item not found")
    

@router.get("/objects_raw", response_model=List[CityObject])
def read_objects_raw(q: Union[str, None] = None):
    with Session(engine) as session:
        statement = select(CityObject)
        result = session.exec(statement)
        return result.all()
    
@router.get("/objects", response_model=List[CityObjectReadModel])
def read_objects(active_on: date | None = None, object_type: int | None = None):
    with Session(engine) as session:
        columns = [CityObject.id, CityObject.ObjectName, CityObject.Address, CityObject.ObjectTypeId, CityObject.OwnerId, CityObject.Capacity, CityObject.DateOpened, CityObject.PeriodStart, CityObject.PeriodEnd, CityObjectOwner.OwnerName, CityObjectType.ObjectTypeName]
        statement = select(*columns).join(CityObjectOwner).join(CityObjectType)
        if active_on is not None:
            statement = statement.where(between(active_on, CityObject.PeriodStart, CityObject.PeriodEnd))
        if object_type is not None:
            statement = statement.where(CityObject.ObjectTypeId == object_type)
        objects = session.exec(statement).all()

        return objects
@router.delete("/objects/{item_id}")
def delete_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityObject).where(CityObject.id == item_id)
        try:
            obj = session.exec(query).one()
            session.delete(obj)
            session.commit()
        except NoResultFound as e:
            raise HTTPException(status_code=404, detail="Item not found")
    
@router.post("/objects")
def create_object(entry: CityObject):
    with Session(engine) as session:
        session.add(entry)
        session.commit()
        return entry.id

@router.patch("/objects/{item_id}", response_model=CityObjectModel)
def update_object(item_id: int, updated_object: CityObject, q: Union[str, None] = None):
    with Session(engine) as session:
            obj = session.get(CityObject, item_id)
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


