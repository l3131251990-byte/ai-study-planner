# Submission Checklist

## GitHub

- [ ] 创建 GitHub 公开仓库
- [ ] 推送本地代码到 GitHub
- [ ] 确认至少 3 个不同日期的有效提交
- [ ] README 中补充 GitHub 仓库地址、Vercel URL、Render URL

## Render

- [ ] 导入 GitHub 仓库
- [ ] Root Directory 设置为 `backend`
- [ ] Build Command 设置为 `pip install -r requirements.txt`
- [ ] Start Command 设置为 `gunicorn app:app`
- [ ] 配置 `DATABASE_URL`
- [ ] 访问 `/api/health` 验证后端

## Vercel

- [ ] 导入 GitHub 仓库
- [ ] Root Directory 设置为 `frontend`
- [ ] 配置 `NEXT_PUBLIC_API_BASE_URL`
- [ ] 部署后访问 `/tasks` 和 `/prompts` 验证联通

## Supabase

- [ ] 创建免费 PostgreSQL 项目
- [ ] 复制数据库连接字符串
- [ ] 将连接字符串配置到 Render
- [ ] 截图保存到 `docs/screenshots/`

## 考核材料

- [ ] `README.md`
- [ ] `api_docs.md`
- [ ] `prompt_log.md`
- [ ] `code_review.md`
- [ ] `summary.md` 不少于 500 字
- [ ] 接口测试截图
- [ ] 数据库截图
- [ ] AI Code Review 截图或报告
- [ ] 项目演示录屏

