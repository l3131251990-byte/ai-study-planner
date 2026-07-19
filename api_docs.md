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

