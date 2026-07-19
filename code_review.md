# AI Code Review

本文件用于提交 AI Code Review 结果，可在最终提交时截图或直接作为报告提交。

## Review 时间

- 日期：2026-07-19
- 使用工具：Codex
- 项目：AI Study Planner

## Review 范围

- 前端：`frontend/app/page.tsx`、`frontend/app/tasks/page.tsx`、`frontend/app/prompts/page.tsx`、`frontend/lib/api.ts`
- 后端：`backend/app.py`、`backend/tests/test_api.py`
- 文档：`README.md`、`api_docs.md`、`deployment.md`、`prompt_log.md`

## AI 原始审查建议

```text
1. Dashboard 首页如果在服务端组件中直接请求 Flask API，Vercel 构建阶段可能因为 Render 后端未部署或暂时不可访问而失败。建议改为客户端组件，在浏览器运行时请求 API，并提供离线提示。

2. 前端 API 基础地址应处理尾部斜杠，例如 NEXT_PUBLIC_API_BASE_URL=https://example.onrender.com/ 时，拼接 /api/tasks 会变成双斜杠。建议统一去掉末尾斜杠。

3. Flask create_app 建议支持 test_config 注入，使测试环境可以使用 sqlite:///:memory:，避免测试时误用本地开发数据库。

4. 后端至少 3 个 API 已满足要求，但建议补充 pytest 自动测试，覆盖 health、task workflow 和 prompt workflow，这可以作为工程化加分项。

5. 部署文档需要明确 Render/Vercel 的 Root Directory、Build Command、Start Command 和环境变量，避免 GitHub 导入时配置错误。

6. 不应提交 .env、SQLite 数据库、node_modules、npm cache、TypeScript 增量缓存等本地文件。建议完善 .gitignore。
```

## 采纳结果

| 建议 | 是否采纳 | 对应文件或提交 |
| --- | --- | --- |
| Dashboard 改为客户端运行时取数 | 已采纳 | `frontend/app/page.tsx`，`1ea0cbc` |
| API 地址去掉末尾斜杠 | 已采纳 | `frontend/lib/api.ts`，`1ea0cbc` |
| `create_app` 支持测试配置注入 | 已采纳 | `backend/app.py`，`abae958` |
| 增加 pytest 后端 API 测试 | 已采纳 | `backend/tests/test_api.py`，`abae958` |
| 明确部署配置 | 已采纳 | `README.md`、`deployment.md`，`1ea0cbc` |
| 完善 `.gitignore` | 已采纳 | `.gitignore`，`189d36e` |

## 验证记录

### 后端测试

```text
backend pytest: 3 passed
```

覆盖接口：

- `GET /api/health`
- `POST /api/tasks`
- `PATCH /api/tasks/<id>`
- `DELETE /api/tasks/<id>`
- `POST /api/prompts`
- `GET /api/prompts`

### 前端检查

```text
frontend TypeScript: tsc --noEmit passed
```

### 已知本机限制

当前 Windows/Codex 本地环境中，Next.js 的 SWC 原生包加载失败，`next build` 未能在本机完成。项目已通过 TypeScript 静态检查，且首页已调整为客户端运行时取数，最终以前端部署平台 Vercel 的云端构建结果作为验证依据。

