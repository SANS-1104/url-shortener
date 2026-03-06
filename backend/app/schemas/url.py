from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional

class URLCreate(BaseModel):
    original_url: HttpUrl
    valid_till: Optional[datetime] = None


class URLResponse(BaseModel):
    id: int
    original_url: HttpUrl
    short_code: str
    created_at: datetime
    valid_till: Optional[datetime]
    is_active: bool
    clicks: int

    class Config:
        from_attributes = True
