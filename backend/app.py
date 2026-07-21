import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

db = SQLAlchemy()


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(160), nullable=False)
    description = db.Column(db.Text, default="")
    status = db.Column(db.String(20), default="todo")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class PromptLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prompt = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    related_file = db.Column(db.String(240), default="")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "prompt": self.prompt,
            "response": self.response,
            "related_file": self.related_file,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(160), nullable=False)
    goal = db.Column(db.Text, default="")
    status = db.Column(db.String(20), default="planned")
    due_date = db.Column(db.String(40), default="")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "goal": self.goal,
            "status": self.status,
            "due_date": self.due_date,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(160), nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(80), default="general")
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "category": self.category,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


def create_app(test_config=None):
    app = Flask(__name__)
    database_url = os.getenv("DATABASE_URL", "sqlite:///dev.db")
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql+psycopg://", 1)
    elif database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+psycopg://", 1)

    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    if test_config:
        app.config.update(test_config)

    CORS(app)
    db.init_app(app)

    with app.app_context():
        db.create_all()

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "service": "ai-study-planner-api"})

    @app.get("/api/tasks")
    def list_tasks():
        tasks = Task.query.order_by(Task.created_at.desc()).all()
        return jsonify([task.to_dict() for task in tasks])

    @app.post("/api/tasks")
    def create_task():
        data = request.get_json(silent=True) or {}
        title = (data.get("title") or "").strip()
        if not title:
            return jsonify({"error": "title is required"}), 400

        task = Task(
            title=title,
            description=(data.get("description") or "").strip(),
            status=data.get("status") or "todo",
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201

    @app.patch("/api/tasks/<int:task_id>")
    def update_task(task_id):
        task = db.session.get(Task, task_id)
        if not task:
            return jsonify({"error": "task not found"}), 404

        data = request.get_json(silent=True) or {}
        if "title" in data:
            task.title = (data.get("title") or "").strip() or task.title
        if "description" in data:
            task.description = (data.get("description") or "").strip()
        if "status" in data:
            task.status = data.get("status") or task.status

        db.session.commit()
        return jsonify(task.to_dict())

    @app.delete("/api/tasks/<int:task_id>")
    def delete_task(task_id):
        task = db.session.get(Task, task_id)
        if not task:
            return jsonify({"error": "task not found"}), 404

        db.session.delete(task)
        db.session.commit()
        return jsonify({"ok": True})

    @app.get("/api/prompts")
    def list_prompts():
        prompts = PromptLog.query.order_by(PromptLog.created_at.desc()).all()
        return jsonify([prompt.to_dict() for prompt in prompts])

    @app.post("/api/prompts")
    def create_prompt():
        data = request.get_json(silent=True) or {}
        prompt_text = (data.get("prompt") or "").strip()
        response_text = (data.get("response") or "").strip()
        if not prompt_text or not response_text:
            return jsonify({"error": "prompt and response are required"}), 400

        prompt_log = PromptLog(
            prompt=prompt_text,
            response=response_text,
            related_file=(data.get("related_file") or "").strip(),
        )
        db.session.add(prompt_log)
        db.session.commit()
        return jsonify(prompt_log.to_dict()), 201

    @app.get("/api/plans")
    def list_plans():
        plans = Plan.query.order_by(Plan.created_at.desc()).all()
        return jsonify([plan.to_dict() for plan in plans])

    @app.post("/api/plans")
    def create_plan():
        data = request.get_json(silent=True) or {}
        title = (data.get("title") or "").strip()
        if not title:
            return jsonify({"error": "title is required"}), 400

        plan = Plan(
            title=title,
            goal=(data.get("goal") or "").strip(),
            status=data.get("status") or "planned",
            due_date=(data.get("due_date") or "").strip(),
        )
        db.session.add(plan)
        db.session.commit()
        return jsonify(plan.to_dict()), 201

    @app.get("/api/notes")
    def list_notes():
        notes = Note.query.order_by(Note.created_at.desc()).all()
        return jsonify([note.to_dict() for note in notes])

    @app.post("/api/notes")
    def create_note():
        data = request.get_json(silent=True) or {}
        title = (data.get("title") or "").strip()
        content = (data.get("content") or "").strip()
        if not title or not content:
            return jsonify({"error": "title and content are required"}), 400

        note = Note(
            title=title,
            content=content,
            category=(data.get("category") or "general").strip(),
        )
        db.session.add(note)
        db.session.commit()
        return jsonify(note.to_dict()), 201

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
