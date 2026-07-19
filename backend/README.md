# Backend

Flask API for AI Study Planner.

## Local Development

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements-dev.txt
python app.py
```

## Test

```bash
pytest
```

## Render

```text
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
```

Required environment variable:

```text
DATABASE_URL=postgresql://...?...sslmode=require
```
