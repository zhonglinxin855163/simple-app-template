# Simple App Template

一个现代化、生产就绪的 Next.js 模板，预配置了数据库、存储和 UI 组件。几分钟内即可启动你的项目。

## ✨ 特性

- **Next.js 15** App Router + Turbopack
- **React 19** 服务端组件
- **TypeScript** 类型安全
- **Tailwind CSS 4** 样式
- **Shadcn UI** 组件 (Button, Input, Textarea)
- **Drizzle ORM** + PostgreSQL 数据库
- **S3 兼容存储** 模块（支持 AWS S3、Cloudflare R2 等）

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/zhonglinxin855163/simple-app-template.git my-app
cd my-app
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

在根目录创建 `.env` 文件：

```env
# 数据库（必需）
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# 存储（可选 - 用于文件上传）
STORAGE_REGION=us-east-1
STORAGE_ACCESS_KEY_ID=your-access-key
STORAGE_SECRET_ACCESS_KEY=your-secret-key
STORAGE_BUCKET_NAME=your-bucket-name
STORAGE_ENDPOINT=https://your-endpoint.com
STORAGE_PUBLIC_URL=https://cdn.example.com
STORAGE_FORCE_PATH_STYLE=true
```

### 4. 设置数据库

在 `src/server/db/schema.ts` 中定义表结构：

```typescript
import { integer, pgTable, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
```

然后推送到数据库：

```bash
npx drizzle-kit push
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由
│   │   │   └── storage/       # 存储 API 端点
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   └── globals.css        # 全局样式
│   ├── components/
│   │   └── ui/                # Shadcn UI 组件
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── textarea.tsx
│   ├── lib/
│   │   └── utils.ts           # 工具函数
│   ├── server/
│   │   └── db/                # 数据库配置
│   │       ├── db.ts          # 数据库客户端
│   │       └── schema.ts      # 表定义
│   └── storage/               # 存储模块
│       ├── index.ts           # 主导出
│       ├── types.ts           # TypeScript 类型
│       ├── config/            # 存储配置
│       └── provider/          # S3 提供者
├── drizzle.config.ts          # Drizzle 配置
├── package.json
└── tsconfig.json
```

## 🗄️ 数据库使用

```typescript
import { db } from "@/server/db/db";
import { users } from "@/server/db/schema";

// 查询数据
const allUsers = await db.select().from(users);

// 插入数据
await db.insert(users).values({
  name: "张三",
  email: "zhangsan@example.com",
});
```

## 📦 存储使用

```typescript
import { uploadFile, deleteFile, getPresignedUploadUrl } from "@/storage";

// 服务端上传
const { url, key } = await uploadFile(
  fileBuffer,
  "image.jpg",
  "image/jpeg",
  "uploads"
);

// 客户端上传
import { uploadFileFromBrowser } from "@/storage";

const { url, key } = await uploadFileFromBrowser(file, "uploads");
```

## 🛠️ 可用脚本

| 命令 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器（Turbopack） |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npx drizzle-kit push` | 推送数据库表结构 |
| `npx drizzle-kit studio` | 打开 Drizzle Studio（数据库 GUI） |

## 📚 添加更多 UI 组件

使用 Shadcn CLI 添加组件：

```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

浏览所有组件：[ui.shadcn.com](https://ui.shadcn.com/docs/components)

## 📄 许可证

MIT
