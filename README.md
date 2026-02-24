# 💪 fit-app

> A platform for trainers and their trainees — stay connected everywhere.

fit-app is a full-stack web application that bridges the gap between personal trainers and their clients. Trainers can create and assign workout plans, track trainee progress, and manage their exercise library — all in one place.

---

## ✨ Features

- **Trainer dashboard** — manage trainees, build workout plans, and assign exercises
- **Trainee view** — access assigned workouts, log progress, and stay on track
- **Exercise library** — pre-loaded database of exercises (powered by `exercises.json`)
- **Role-based access** — separate experiences for trainers and trainees
- **Responsive design** — works seamlessly on desktop and mobile

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Database ORM | [Prisma](https://www.prisma.io/) |
| Styling | Tailwind CSS |
| Package Manager | pnpm |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- A PostgreSQL database (or compatible)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/menthaspicata/fit-app.git
cd fit-app

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your DATABASE_URL and any other required variables

# 4. Run database migrations
npx prisma migrate dev

# 5. (Optional) Seed the exercise library
node import-exercises.js

# 6. Start the development server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🗄 Database

This project uses **Prisma** as the ORM. The schema is located in `prisma/schema.prisma`.

Common Prisma commands:

```bash
# Open Prisma Studio (visual DB browser)
npx prisma studio

# Generate Prisma Client after schema changes
npx prisma generate

# Create and apply a new migration
npx prisma migrate dev --name <migration-name>
```

---

## 📁 Project Structure

```
fit-app/
├── prisma/             # Prisma schema and migrations
├── public/             # Static assets
├── src/
│   └── app/            # Next.js App Router pages and API routes
├── media/              # Media assets
├── exercises.json      # Exercise library data
├── import-exercises.js # Script to seed exercises into the database
└── ...
```

---

## 📄 License

This project is open source. Feel free to use, modify, and contribute.