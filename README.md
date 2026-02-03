# Simple App Template

A modern, production-ready Next.js template with pre-configured database, storage, and UI components. Get your project up and running in minutes.

## ✨ Features

- **Next.js 15** with App Router and Turbopack
- **React 19** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Shadcn UI** components (Button, Input, Textarea)
- **Drizzle ORM** with PostgreSQL
- **S3-compatible Storage** module (supports AWS S3, Cloudflare R2, etc.)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/zhonglinxin855163/simple-app-template.git my-app
cd my-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database (Required)
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Storage (Optional - for file uploads)
STORAGE_REGION=us-east-1
STORAGE_ACCESS_KEY_ID=your-access-key
STORAGE_SECRET_ACCESS_KEY=your-secret-key
STORAGE_BUCKET_NAME=your-bucket-name
STORAGE_ENDPOINT=https://your-endpoint.com
STORAGE_PUBLIC_URL=https://cdn.example.com
STORAGE_FORCE_PATH_STYLE=true
```

### 4. Set up the database

Define your tables in `src/server/db/schema.ts`:

```typescript
import { integer, pgTable, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
```

Then push to database:

```bash
npx drizzle-kit push
```

### 5. Start the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── storage/       # Storage API endpoints
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   └── ui/                # Shadcn UI components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── textarea.tsx
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── server/
│   │   └── db/                # Database configuration
│   │       ├── db.ts          # Database client
│   │       └── schema.ts      # Table definitions
│   └── storage/               # Storage module
│       ├── index.ts           # Main exports
│       ├── types.ts           # TypeScript types
│       ├── config/            # Storage configuration
│       └── provider/          # S3 provider
├── drizzle.config.ts          # Drizzle configuration
├── package.json
└── tsconfig.json
```

## 🗄️ Database Usage

```typescript
import { db } from "@/server/db/db";
import { users } from "@/server/db/schema";

// Query data
const allUsers = await db.select().from(users);

// Insert data
await db.insert(users).values({
  name: "John Doe",
  email: "john@example.com",
});
```

## 📦 Storage Usage

```typescript
import { uploadFile, deleteFile, getPresignedUploadUrl } from "@/storage";

// Server-side upload
const { url, key } = await uploadFile(
  fileBuffer,
  "image.jpg",
  "image/jpeg",
  "uploads"
);

// Client-side upload
import { uploadFileFromBrowser } from "@/storage";

const { url, key } = await uploadFileFromBrowser(file, "uploads");
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npx drizzle-kit push` | Push schema changes to database |
| `npx drizzle-kit studio` | Open Drizzle Studio (database GUI) |

## 📚 Adding More UI Components

Use Shadcn CLI to add more components:

```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

Browse all components at [ui.shadcn.com](https://ui.shadcn.com/docs/components)

## 📄 License

MIT
