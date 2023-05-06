from sqlmodel import create_engine

engine = create_engine(url= "postgresql://fallenchromium@localhost:5432/lab2", echo=True, future=True)
