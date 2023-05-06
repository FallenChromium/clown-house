from sqlmodel import Field, SQLModel, Session, select
from typing import List, Optional
from datetime import date
from config import engine
from .CityObject import CityObject

class CityObjectStatsModel(SQLModel):
    id : Optional[int] = Field(default=None, primary_key=True)
    CityObjectId : int = Field(default=None, foreign_key="city_objects.id")
    Date : date
    Visitors : int

class CityObjectStats(CityObjectStatsModel, table=True):
    __tablename__: str = "city_object_stats"

class CityObjectStatsReadModel(CityObjectStatsModel):
    ObjectName: str

from sqlmodel import Field, SQLModel, Session, select
from typing import Optional, Union
from datetime import date
from fastapi import APIRouter, HTTPException
from config import engine
from sqlalchemy.exc import NoResultFound

router = APIRouter()


@router.get("/object_stats/{item_id}", response_model=CityObjectStats)
def read_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityObjectStats).where(CityObjectStats.id == item_id)
        try:
            obj = session.exec(query).one()
            return obj
        except NoResultFound:
            raise HTTPException(status_code=404, detail="Item not found")
    

@router.get("/object_stats_raw", response_model=List[CityObjectStats])
def read_objects_raw(q: Union[str, None] = None):
    with Session(engine) as session:
        statement = select(CityObjectStats)
        result = session.exec(statement)
        return result.all()

@router.get("/object_stats", response_model=List[CityObjectStatsReadModel])
def read_objects(q: Union[str, None] = None):
    with Session(engine) as session:
        columns = [CityObjectStats.id, CityObjectStats.CityObjectId, CityObjectStats.Date, CityObjectStats.Visitors, CityObject.ObjectName]
        statement = select(*columns).join(CityObject)
        result = session.exec(statement)
        return result.all()


@router.delete("/object_stats/{item_id}")
def delete_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityObjectStats).where(CityObjectStats.id == item_id)
        try:
            obj = session.exec(query).one()
            session.delete(obj)
            session.commit()
        except NoResultFound as e:
            raise HTTPException(status_code=404, detail="Item not found")
    
@router.post("/object_stats")
def create_object(entry: CityObjectStats):
    with Session(engine) as session:
        session.add(entry)
        session.commit()
        return entry.id

@router.patch("/object_stats/{item_id}")
def update_object(item_id: int, updated_object: CityObjectStats, q: Union[str, None] = None):
    with Session(engine) as session:
            obj = session.get(CityObjectStats, item_id)
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
