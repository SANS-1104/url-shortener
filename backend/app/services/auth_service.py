from sqlalchemy.orm import Session
from app.db import models
from app.core.security import hash_password, verify_password, create_access_token


def register_user(db: Session, name: str, email: str, password: str):
    user = models.User(
        name = name,
        email=email,
        password_hash=hash_password(password),
        
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user


def login_user(user):
    return create_access_token({"sub": str(user.id)})
