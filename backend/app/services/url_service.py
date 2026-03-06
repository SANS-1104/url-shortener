from sqlalchemy.orm import Session
from app.db import models
from app.utils.generator import generate_short_code


def create_short_url(
    db: Session,
    original_url: str,
    user_id: int,
    valid_till=None
):
    short_code = generate_short_code()

    while db.query(models.URL).filter(
        models.URL.short_code == short_code
    ).first():
        short_code = generate_short_code()

    url = models.URL(
        original_url=original_url,
        short_code=short_code,
        user_id=user_id,
        valid_till=valid_till,
    )

    db.add(url)
    db.commit()
    db.refresh(url)

    return url

def get_user_urls(db: Session, user_id: int):
    urls = db.query(models.URL).filter(
        models.URL.user_id == user_id
    ).order_by(models.URL.created_at.desc()).all()

    return urls

def delete_url(db: Session, url_id: int, user_id: int):
    url = db.query(models.URL).filter(
        models.URL.id == url_id,
        models.URL.user_id == user_id
    ).first()

    if not url:
        return None

    db.delete(url)
    db.commit()
    return url





def get_original_url(db: Session, short_code: str):
    return db.query(models.URL).filter(
        models.URL.short_code == short_code,
        models.URL.is_active == True
    ).first()
