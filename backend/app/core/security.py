from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from app.core.config import settings
import hashlib

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    # Prevent bcrypt 72-byte limitation by pre-hashing
    sha_password = hashlib.sha256(password.encode("utf-8")).hexdigest()
    return pwd_context.hash(sha_password)


def verify_password(plain_password, hashed_password):
    sha_password = hashlib.sha256(plain_password.encode("utf-8")).hexdigest()
    return pwd_context.verify(sha_password, hashed_password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({"exp": expire})
    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )