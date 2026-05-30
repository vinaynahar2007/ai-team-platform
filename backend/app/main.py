from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router

from app.database import engine, Base

from app.models.user import User

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
    "http://localhost:3000",
    "https://vinaynahar2007-ai-team-platform.vercel.app",
    "https://ai-team-platform-hxssqemvb-vinaynahar2007-2731s-projects.vercel.app"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(auth_router)

@app.get("/")
def home():

    return {
        "message": "AI Team Platform Running 🚀"
    }