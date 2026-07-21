# API Documentation

## Health Check

### GET `/api/health`

Response:

```json
{
  "status": "ok",
  "service": "ai-study-planner-api"
}
```

## Tasks

### GET `/api/tasks`

获取任务列表。

### POST `/api/tasks`

Request:

```json
{
  "title": "完成 Flask API",
  "description": "实现任务接口",
  "status": "todo"
}
```

### PATCH `/api/tasks/<id>`

Request:

```json
{
  "status": "done"
}
```

### DELETE `/api/tasks/<id>`

删除指定任务。

## Prompts

Prompt 接口用于保留开发过程数据和文档留痕，不作为前端主导航页面展示。

### GET `/api/prompts`

获取 AI Prompt 留痕。

### POST `/api/prompts`

Request:

```json
{
  "prompt": "帮我设计项目数据库结构",
  "response": "建议创建 tasks 和 prompts 表...",
  "related_file": "backend/models.py"
}
```

## Plans

### GET `/api/plans`

获取学习计划列表。

### POST `/api/plans`

Request:

```json
{
  "title": "后端 API 阶段",
  "goal": "完成 Flask API 和数据库连接",
  "status": "active",
  "due_date": "2026-07-21"
}
```

## Notes

### GET `/api/notes`

获取学习笔记列表。

### POST `/api/notes`

Request:

```json
{
  "title": "Render 部署问题记录",
  "content": "psycopg2 在 Render Python 3.14 环境中失败，改用 psycopg v3。",
  "category": "deployment"
}
```
