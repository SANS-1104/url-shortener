from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.url import URLCreate, URLResponse
from app.services.url_service import create_short_url, get_original_url, get_user_urls, delete_url
from app.api.deps import get_current_user
from app.db import models
from typing import List
from datetime import datetime

router = APIRouter(prefix="/urls", tags=["URL"])
redirect_router = APIRouter()


@router.post("/shorten", response_model=URLResponse)
def shorten_url(
    url: URLCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return create_short_url(
        db,
        original_url=url.original_url,
        user_id=current_user.id,
        valid_till=url.valid_till
    )

@router.get("/my", response_model=List[URLResponse])
def get_my_urls(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return get_user_urls(db, current_user.id)

@router.delete("/{url_id}")
def delete_my_url(
    url_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    url = delete_url(db, url_id, current_user.id)
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")

    return {"message": "URL deleted"}

from datetime import datetime

@redirect_router.get("/{short_code}")
def redirect(short_code: str, db: Session = Depends(get_db)):
    url = get_original_url(db, short_code)

    if not url:
        raise HTTPException(status_code=404, detail="URL not found")

    # Expiry check
    if url.valid_till and url.valid_till < datetime.utcnow():
        raise HTTPException(status_code=410, detail="URL expired")

    # Increment clicks
    url.clicks += 1
    db.commit()

    return RedirectResponse(url.original_url)