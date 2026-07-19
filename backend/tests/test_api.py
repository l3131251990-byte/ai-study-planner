import pytest

from app import create_app, db


@pytest.fixture()
def client():
    app = create_app(
        {
            "TESTING": True,
            "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
        }
    )

    with app.app_context():
        db.drop_all()
        db.create_all()

    return app.test_client()


def test_health_check(client):
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.get_json()["status"] == "ok"


def test_task_workflow(client):
    created = client.post(
        "/api/tasks",
        json={
            "title": "Finish backend tests",
            "description": "Cover task CRUD API",
            "status": "todo",
        },
    )

    assert created.status_code == 201
    task_id = created.get_json()["id"]

    updated = client.patch(f"/api/tasks/{task_id}", json={"status": "done"})
    assert updated.status_code == 200
    assert updated.get_json()["status"] == "done"

    listed = client.get("/api/tasks")
    assert listed.status_code == 200
    assert len(listed.get_json()) == 1

    deleted = client.delete(f"/api/tasks/{task_id}")
    assert deleted.status_code == 200
    assert deleted.get_json()["ok"] is True


def test_prompt_workflow(client):
    created = client.post(
        "/api/prompts",
        json={
            "prompt": "Review the Flask API",
            "response": "The API structure is clear.",
            "related_file": "backend/app.py",
        },
    )

    assert created.status_code == 201
    assert created.get_json()["related_file"] == "backend/app.py"

    listed = client.get("/api/prompts")
    assert listed.status_code == 200
    assert len(listed.get_json()) == 1
