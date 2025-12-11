# 🚀 Backend API – Kos Management

## 🛠️ Tech Stack

- Express.js
- Prisma ORM
- PostgreSQL
- TypeScript

## 📂 Project Structure

```structure
src/
│── controllers/
│── services/
│── repositories/
│── routes/
│── middlewares/
│── utils/
│── prisma/
│   └── schema.prisma
│── index.ts
└── app.ts
```

- controllers/ → Menerima request & mengembalikan response

- services/ → Bisnis logic

- repositories/ → Akses database (Prisma)

- routes/ → Routing endpoint

- middlewares/ → Authentication, validation, dll

- utils/ → Helper & formatter

- prisma/ → Schema database + migration

## ⚙️ Installation

Setup Environment

```bash
  DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
  PORT=5000
```

Generate Prisma Client

```bash
  npx prisma generate
```

🧪 Testing (Jika digunakan)

```bash
  npm run test
```

🗄️ Prisma Commands

```bash
  # Melihat UI database
  npx prisma studio

  # Membuat migration baru
  npx prisma migrate dev

  # Generate ulang Prisma Client
  npx prisma generate
```
