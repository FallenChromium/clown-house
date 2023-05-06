from sqlalchemy.exc import NoResultFound
from fastapi import APIRouter, HTTPException
from datetime import date
from typing import List, Optional, Union
from sqlmodel import Field, SQLModel, Session, select
from sqlmodel import Field, SQLModel, create_engine, Session, select, case, null
from typing import Optional
from config import engine


class CityObjectOwnerModel(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    Type: bool
    OwnerName: str
    LeaderFullName: str


class CityObjectOwner(CityObjectOwnerModel, table=True):
    __tablename__: str = "city_object_owners"


class CityObjectOwnerReadModel(CityObjectOwnerModel):
    TypeString: str = Field(alias="TypeString")


router = APIRouter()


@router.get("/object_owners/{item_id}", response_model=CityObjectOwner)
def read_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityObjectOwner).where(CityObjectOwner.id == item_id)
        try:
            obj = session.exec(query).one()
            return obj
        except NoResultFound:
            raise HTTPException(status_code=404, detail="Item not found")


@router.get("/object_owners_raw", response_model=List[CityObjectOwner])
def read_objects_raw(q: Union[str, None] = None):
    with Session(engine) as session:
        statement = select(CityObjectOwner)
        result = session.exec(statement)
        return result.all()


@router.get("/object_owners", response_model=List[CityObjectOwnerReadModel])
def read_objects(q: Union[str, None] = None):
    with Session(engine) as session:
      query =  session.query(CityObjectOwner.id, CityObjectOwner.Type, CityObjectOwner.OwnerName, CityObjectOwner.LeaderFullName, 
                               case(
                                   (CityObjectOwner.Type == True, 'Юр.лицо'),
                                   (CityObjectOwner.Type == False, 'Физ.лицо'),
                                   else_=null()
                               ).label("TypeString")
                           )
                           
    result = session.execute(query)
    return result.all()


@router.delete("/object_owners/{item_id}")
def delete_object(item_id: int, q: Union[str, None] = None):
    with Session(engine) as session:
        query = select(CityObjectOwner).where(CityObjectOwner.id == item_id)
        try:
            obj = session.exec(query).one()
            session.delete(obj)
            session.commit()
        except NoResultFound as e:
            raise HTTPException(status_code=404, detail="Item not found")


@router.post("/object_owners")
def create_object(entry: CityObjectOwner):
    with Session(engine) as session:
        session.add(entry)
        session.commit()
        return entry.id


@router.patch("/object_owners/{item_id}", response_model=CityObjectOwner)
def update_object(item_id: int, updated_object: CityObjectOwner, q: Union[str, None] = None):
    with Session(engine) as session:
        obj = session.get(CityObjectOwner, item_id)
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
