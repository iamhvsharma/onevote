
# 🗳️ OneVote

OneVote is a modern and beautiful polling platform where you can create, preview, and share real-time polls effortlessly. Powered by the modern web stack including Next.js 15, Tailwind CSS, Prisma, Clerk, and PostgreSQL.

## 🚀 Features

- 🧠 Create polls with multiple options
- ⏱️ Set expiration durations (1 to 24 hours)
- 🔐 Authenticated poll creation via Clerk
- 📊 Real-time vote preview with percentage bars
- 📎 Copy/share poll link
- 🗑️ Reset and delete polls from dashboard
- 🎨 Responsive and theme-consistent UI

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** Clerk
- **Styling:** Tailwind CSS + Custom `yellow-metal` theme
- **State Management:** useState, useEffect (local state)

---

## 🧑‍💻 Local Development Setup

### 1. Clone the Repo

```bash
git clone https://github.com/iamhvsharma/onevote.git
cd onevote
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory with the following:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/onevote
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
```

### 4. Setup Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the Dev Server

```bash
pnpm dev
```

Visit `http://localhost:3000`

---

## 📦 Production Build

```bash
pnpm build
pnpm start
```

Make sure your database and Clerk keys are correctly configured.

---

## 📁 Project Structure

```
apps/
 ├── app/                # Next.js App Router
 │   ├── landing/        # Landing page
 │   ├── dashboard/      # User dashboard
 │   └── poll/           # Audience poll pages
 ├── components/         # Reusable components
 ├── lib/                # DB and utilities
 ├── types/              # Shared TypeScript types
 ├── prisma/             # Prisma schema and migrations
 └── public/             # Static assets
```

---

## 🧪 Linting & Type Checking

```bash
pnpm lint
pnpm typecheck
```

---

## 💻 Author

**Harshvardhan Sharma**  
🔗 [@iamhvsharma](https://github.com/iamhvsharma)

---

## ⭐️ Support & Contribute

If you found this useful or beautiful, give it a ⭐ on GitHub and feel free to contribute!
