from sqlmodel import Field, SQLModel, Session, select
from typing import Optional, Union
from config import engine
from fastapi import APIRouter, HTTPException
from sqlalchemy.exc import NoResultFound
class CityObjectType(SQLModel, table=True):
    __tablename__: str = "city_object_types"
    id : Optional[int] = Field(default=None, primary_key=True)
    ObjectTypeName : str
   


router = APIRouter()


@router.get("/object_types/{item_id}")
def read_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityObjectType).where(CityObjectType.id == item_id)
        try:
            obj = session.exec(query).one()
            return obj
        except NoResultFound:
            raise HTTPException(status_code=404, detail="Item not found")
    

@router.get("/object_types")
def read_objects(q: Union[str, None] = None):
    with Session(engine) as session:
        statement = select(CityObjectType)
        result = session.exec(statement)
        return result.all()

@router.delete("/object_types/{item_id}")
def delete_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityObjectType).where(CityObjectType.id == item_id)
        try:
            obj = session.exec(query).one()
            session.delete(obj)
            session.commit()
        except NoResultFound as e:
            raise HTTPException(status_code=404, detail="Item not found")
    
@router.post("/object_types")
def create_object(entry: CityObjectType):
    with Session(engine) as session:
        session.add(entry)
        session.commit()
        return entry.id

@router.patch("/object_types/{item_id}")
def update_object(item_id: int, updated_object: CityObjectType, q: Union[str, None] = None):
    with Session(engine) as session:
            obj = session.get(CityObjectType, item_id)
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
