# AI Study Planner

AI Study Planner 是一个面向个人自学实训的全栈项目，用于管理学习任务、学习计划和学习笔记。Prompt 日志、Code Review 和总结报告作为仓库文档保留，不作为用户页面展示。

## 技术栈

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Flask, SQLAlchemy, Flask-CORS
- Database: Supabase PostgreSQL 免费版，开发环境可临时使用 SQLite
- Deploy: Vercel(frontend), Render(backend)

## 功能路由

- `/`: 仪表盘，展示任务统计和最近记录
- `/tasks`: 学习任务管理
- `/plans`: 学习计划管理
- `/notes`: 学习笔记记录

## API 文档

后端基础地址：

```text
https://ai-study-planner-g7al.onrender.com
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
| GET | `/api/plans` | 获取学习计划 |
| POST | `/api/plans` | 新建学习计划 |
| GET | `/api/notes` | 获取学习笔记 |
| POST | `/api/notes` | 新建学习笔记 |

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

- GitHub Repository: [https://github.com/l3131251990-byte/ai-study-planner](https://github.com/l3131251990-byte/ai-study-planner)
- Vercel Frontend: [https://ai-study-planner-ashy.vercel.app](https://ai-study-planner-ashy.vercel.app)
- Render Backend: [https://ai-study-planner-g7al.onrender.com](https://ai-study-planner-g7al.onrender.com)
- Render Dashboard: [https://dashboard.render.com/web/srv-d9ed4lbrjlhs73c6uhj0](https://dashboard.render.com/web/srv-d9ed4lbrjlhs73c6uhj0)
- Backend Health Check: [https://ai-study-planner-g7al.onrender.com/api/health](https://ai-study-planner-g7al.onrender.com/api/health)
- Tasks API: [https://ai-study-planner-g7al.onrender.com/api/tasks](https://ai-study-planner-g7al.onrender.com/api/tasks)
- Plans API: [https://ai-study-planner-g7al.onrender.com/api/plans](https://ai-study-planner-g7al.onrender.com/api/plans)
- Notes API: [https://ai-study-planner-g7al.onrender.com/api/notes](https://ai-study-planner-g7al.onrender.com/api/notes)

## 前端页面

- 仪表盘: [https://ai-study-planner-ashy.vercel.app](https://ai-study-planner-ashy.vercel.app)
- 学习任务: [https://ai-study-planner-ashy.vercel.app/tasks](https://ai-study-planner-ashy.vercel.app/tasks)
- 学习计划: [https://ai-study-planner-ashy.vercel.app/plans](https://ai-study-planner-ashy.vercel.app/plans)
- 学习笔记: [https://ai-study-planner-ashy.vercel.app/notes](https://ai-study-planner-ashy.vercel.app/notes)

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

- GitHub 仓库地址：[https://github.com/l3131251990-byte/ai-study-planner](https://github.com/l3131251990-byte/ai-study-planner)
- 前端线上 URL：[https://ai-study-planner-ashy.vercel.app](https://ai-study-planner-ashy.vercel.app)
- 后端 API URL：[https://ai-study-planner-g7al.onrender.com](https://ai-study-planner-g7al.onrender.com)
- 数据库截图：[数据库截图1.png](https://github.com/l3131251990-byte/ai-study-planner/blob/main/docs/screenshots/%E6%95%B0%E6%8D%AE%E5%BA%93%E6%88%AA%E5%9B%BE1.png)
- AI Code Review 截图或报告：`code_review.md`
- 演示录屏：[项目演示.mp4](https://github.com/l3131251990-byte/ai-study-planner/blob/main/docs/screenshots/%E9%A1%B9%E7%9B%AE%E6%BC%94%E7%A4%BA.mp4)
- 个人总结报告：`summary.md`

## 文档位置

- API 文档：`api_docs.md`
- Prompt 日志：`prompt_log.md`
- AI Code Review：`code_review.md`
- 个人总结：`summary.md`
- 部署说明：`deployment.md`
- 提交检查清单：`submission_checklist.md`
- 截图目录：`docs/screenshots/`

## 演示与截图材料

- 数据库截图 1：[数据库截图1.png](https://github.com/l3131251990-byte/ai-study-planner/blob/main/docs/screenshots/%E6%95%B0%E6%8D%AE%E5%BA%93%E6%88%AA%E5%9B%BE1.png)
- 数据库截图 2：`docs/screenshots/数据库截图2.png`
- 项目演示视频：[项目演示.mp4](https://github.com/l3131251990-byte/ai-study-planner/blob/main/docs/screenshots/%E9%A1%B9%E7%9B%AE%E6%BC%94%E7%A4%BA.mp4)

## 当前验证记录

- 后端自动测试：`pytest`，5 passed
- 前端静态检查：`tsc --noEmit`，passed
- Render 后端健康检查：`/api/health` 返回 `{"service":"ai-study-planner-api","status":"ok"}`
- Vercel 前端构建：云端构建通过
