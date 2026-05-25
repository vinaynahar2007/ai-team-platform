from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    skills = Column(String, nullable=True)

    interests = Column(String, nullable=True)

    experience = Column(String, nullable=True)

    bio = Column(String, nullable=True)