backend/
│
    ├── app/
    │
    ├── main.py
    │
    ├── core/
    │   ├── config.py
    │   └── security.py      # JWT, hashing
    │
    ├── db/
    │   ├── database.py
    │   └── models.py        # User + URL tables
    │
    ├── schemas/
    │   ├── user.py          # Pydantic user models
    │   └── url.py
    │
    ├── api/
    │   ├── auth_routes.py   # login/signup
    │   ├── deps.py
    │   └── url_routes.py
    │
    ├── services/
    │   ├── auth_service.py
    │   └── url_service.py
    │
    └── utils/
        └── generator.py

│
├── .env
├── requirements.txt
└── README.md
