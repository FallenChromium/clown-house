from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from handlers import CityObject
from handlers import CityObjectType
from handlers import CityObjectOwner
from handlers import CityObjectStats
from handlers import CityEvent
from handlers import CityEventType
import config
app = FastAPI()

origins = [
    "http://localhost:3001",
    "http://localhost:5173",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:5173",
    "http://localhost:4173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SQLModel.metadata.create_all(config.engine)

app.include_router(CityObject.router)
app.include_router(CityObjectType.router)
app.include_router(CityObjectOwner.router)
app.include_router(CityObjectStats.router)
app.include_router(CityEvent.router)
app.include_router(CityEventType.router)



