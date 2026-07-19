# Deployment Guide

## Supabase

1. 创建 Supabase 免费项目。
2. 在 Project Settings 中复制 PostgreSQL connection string。
3. 将连接字符串配置到 Render 的 `DATABASE_URL`。

## Render Backend

1. 新建 Web Service。
2. 连接 GitHub 仓库。
3. Root Directory 设置为 `backend`。
4. Build Command:

```bash
pip install -r requirements.txt
```

5. Start Command:

```bash
gunicorn app:app
```

6. 添加环境变量：

```text
DATABASE_URL=你的 Supabase PostgreSQL 连接字符串
FLASK_ENV=production
```

## Vercel Frontend

1. 新建 Vercel Project。
2. 连接 GitHub 仓库。
3. Root Directory 设置为 `frontend`。
4. 添加环境变量：

```text
NEXT_PUBLIC_API_BASE_URL=你的 Render 后端地址
```

5. 部署后把 URL 写入 `README.md`。

