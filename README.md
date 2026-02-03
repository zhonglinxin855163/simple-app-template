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

## 🐣 Drizzle ORM 小白入门

### 什么是 Drizzle？

**Drizzle ORM** 是一个帮助你用 TypeScript 代码操作数据库的工具。

打个比方：
- 🏦 **数据库** = 一个大仓库，用来存放你的数据（用户信息、订单、文章等）
- 📝 **SQL** = 仓库管理员使用的专业语言，告诉仓库怎么存取东西
- 🤖 **Drizzle ORM** = 一个翻译官，让你用熟悉的 TypeScript 代码，自动翻译成 SQL 语言

### 为什么用 Drizzle？

| 不用 Drizzle ❌ | 用 Drizzle ✅ |
|----------------|--------------|
| 需要学习复杂的 SQL 语法 | 只需写 TypeScript 代码 |
| 容易写错 SQL，难以调试 | 有类型提示，写错会提醒 |
| 修改表结构很麻烦 | 一条命令同步数据库 |

### 项目中的关键文件

本项目已经配置好了 Drizzle，你只需要了解这几个文件：

```
📁 项目根目录
├── drizzle.config.ts      # Drizzle 配置（一般不用动）
└── 📁 src/server/db/
    ├── schema.ts          # ⭐ 定义数据表结构（最常编辑）
    └── db.ts              # 数据库连接（一般不用动）
```

### 如何定义一张表？

在 `src/server/db/schema.ts` 中，像这样定义一张用户表：

```typescript
import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),  // 主键，自动生成
  name: varchar("name", { length: 255 }).notNull(),            // 用户名，必填
  email: varchar("email", { length: 255 }).notNull().unique(), // 邮箱，必填且唯一
  createdAt: timestamp("created_at").defaultNow(),             // 创建时间，默认当前时间
});
```

### 常用字段类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `integer` | 整数 | 年龄、数量 |
| `varchar` | 字符串（需指定长度） | 用户名、邮箱 |
| `text` | 长文本 | 文章内容、描述 |
| `boolean` | 布尔值 | 是否激活、是否已读 |
| `timestamp` | 时间戳 | 创建时间、更新时间 |

### 常用命令

修改 `schema.ts` 后，运行以下命令让数据库同步更新：

```bash
# 推送表结构到数据库
npx drizzle-kit push

# 打开可视化管理界面（可以直接看数据）
npx drizzle-kit studio
```

### 小提示 💡

1. **修改表结构后** 一定要运行 `npx drizzle-kit push`，否则数据库不会更新
2. **想看数据库里有什么？** 运行 `npx drizzle-kit studio`，浏览器会打开一个可视化界面
3. **表名用小写复数**（如 `users`、`posts`），这是常见命名规范

---

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
