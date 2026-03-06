from fastapi import FastAPI
from app.db.database import Base, engine
from app.api import auth_routes, url_routes
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Advanced URL Shortener")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(url_routes.router)
app.include_router(url_routes.redirect_router)