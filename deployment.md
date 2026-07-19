# Deployment Guide

## Supabase

1. 创建 Supabase 免费项目。
2. 在 Project Settings 中复制 PostgreSQL connection string。
3. 将连接字符串配置到 Render 的 `DATABASE_URL`。

## Render Backend

1. 新建 Web Service。
2. 连接 GitHub 仓库。
3. Root Directory 设置为 `backend`。
4. Runtime 使用 Python，项目中已提供 `backend/runtime.txt`。
5. Build Command:

```bash
pip install -r requirements.txt
```

6. Start Command:

```bash
gunicorn app:app
```

7. 添加环境变量：

```text
DATABASE_URL=你的 Supabase PostgreSQL 连接字符串
FLASK_ENV=production
```

部署成功后，访问：

```text
https://你的-render-service.onrender.com/api/health
```

如果返回 `{"status":"ok"}`，说明后端部署成功。

## Vercel Frontend

1. 新建 Vercel Project。
2. 连接 GitHub 仓库。
3. Root Directory 设置为 `frontend`。
4. 添加环境变量：

```text
NEXT_PUBLIC_API_BASE_URL=你的 Render 后端地址
```

5. 部署后把 URL 写入 `README.md`。

前端部署完成后，进入 `/tasks` 和 `/prompts` 页面测试新增数据。如果数据能刷新展示，说明 Vercel、Render 和数据库已经联通。
