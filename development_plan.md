# Development Plan

## 阶段 1：项目初始化

- 创建前后端目录结构
- 创建 README、Prompt Log、API 文档、部署文档、总结模板
- 初始化 Git 仓库
- 推荐提交信息：`chore: initialize fullstack project structure`

## 阶段 2：后端 API

- 完成 Flask 应用配置
- 完成任务 API
- 完成 Prompt 日志 API
- 配置本地 SQLite 和生产 PostgreSQL
- 推荐提交信息：`feat: add flask api for tasks and prompts`
- 当前状态：已完成后端 API 测试，并完成前端任务/Prompt 基础交互页面

## 阶段 3：前端页面

- 完成 4 个 Next.js 路由
- 接入后端 API
- 完成任务和 Prompt 的基础交互
- 推荐提交信息：`feat: connect nextjs pages with flask api`

## 阶段 4：部署

- Supabase 创建免费数据库
- Render 部署 Flask 后端
- Vercel 部署 Next.js 前端
- 推荐提交信息：`docs: add deployment guide and api documentation`

## 阶段 5：考核留痕

- 整理 Prompt 日志
- 使用 AI 做一次 Code Review
- 补充截图、接口测试记录和总结报告
- 推荐提交信息：`docs: add prompt log code review and final summary`
