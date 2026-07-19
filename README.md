# AI Study Planner

AI Study Planner 是一个面向个人自学实训的全栈项目，用于管理学习任务、AI Prompt 留痕和项目复盘记录。

## 技术栈

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Flask, SQLAlchemy, Flask-CORS
- Database: Supabase PostgreSQL 免费版，开发环境可临时使用 SQLite
- Deploy: Vercel(frontend), Render(backend)

## 功能路由

- `/`: 仪表盘，展示任务统计和最近记录
- `/tasks`: 学习任务管理
- `/prompts`: AI Prompt 日志
- `/review`: Code Review 和项目复盘

## API 文档

后端基础地址：

```text
http://localhost:5000
```

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | 健康检查 |
| GET | `/api/tasks` | 获取任务列表 |
| POST | `/api/tasks` | 新建任务 |
| PATCH | `/api/tasks/<id>` | 更新任务 |
| DELETE | `/api/tasks/<id>` | 删除任务 |
| GET | `/api/prompts` | 获取 Prompt 日志 |
| POST | `/api/prompts` | 新建 Prompt 日志 |

## 本地运行

### 后端

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python app.py
```

### 后端测试

```bash
cd backend
pip install -r requirements-dev.txt
pytest
```

### 前端

```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

## 部署计划

- Flask API 部署到 Render
- Next.js 前端部署到 Vercel
- PostgreSQL 使用 Supabase 免费项目
- 前端环境变量 `NEXT_PUBLIC_API_BASE_URL` 指向 Render 后端 URL
- 后端环境变量 `DATABASE_URL` 指向 Supabase 连接字符串

## 线上地址

提交前补充：

```text
GitHub Repository:
Vercel Frontend:
Render Backend:
Backend Health Check:
```

## Render 配置

```text
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
Environment:
  DATABASE_URL=Supabase PostgreSQL 连接字符串
  FLASK_ENV=production
```

## Vercel 配置

```text
Root Directory: frontend
Build Command: npm run build
Install Command: npm install
Environment:
  NEXT_PUBLIC_API_BASE_URL=Render 后端 URL
```

## Git 留痕建议

当前按一天内完成项目处理，仍保留清晰的阶段提交记录：

- `chore: initialize fullstack project structure`
- `feat: add task and prompt workflows`
- `test: add backend api coverage`
- `docs: add deployment evidence and final summary`

## 提交物清单

- GitHub 仓库地址：
- 前端线上 URL：
- 后端 API URL：
- 数据库截图：
- Postman 或 Apifox 接口截图：
- AI Code Review 截图或报告：
- 演示录屏：
- 个人总结报告：

## 当前验证记录

- 后端自动测试：`pytest`，3 passed
- 前端静态检查：`tsc --noEmit`，passed
- 本机限制：当前 Windows/Codex 环境中 Next SWC 原生包加载失败，最终以前端部署平台 Vercel 的构建结果为准
