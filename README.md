# 💪 ConnectFit

> **The Personal Training Platform That Scales With Your Business**

Transform how trainers and clients connect. ConnectFit is a modern, full-featured platform that empowers personal trainers to manage clients, create dynamic workout plans, track progress, and build their training empire - all from one intuitive dashboard.

---

## ✨ What Makes ConnectFit Special

- **🎯 Trainer Superpowers** — Build custom workout plans, manage unlimited trainees, assign exercises with a single click, and monitor progress in real-time
- **📱 Client-First Design** — Trainees get a beautiful, distraction-free interface to log workouts, track measurements, and stay motivated
- **💪 Comprehensive Exercise Library** — 500+ pre-loaded exercises with detailed descriptions and muscle group categorization
- **📊 Advanced Progress Tracking** — Body measurements, workout history, and performance analytics at your fingertips
- **🔗 Seamless Collaboration** — Invite trainees via unique tokens, manage trainer-client relationships effortlessly
- **🌙 Modern UI/UX** — Dark mode—light mode toggled themes, responsive design that works beautifully on all devices
- **🔐 Enterprise-Grade Security** — Role-based access control, secure authentication with better-auth, encrypted password storage

---

## 🎯 Perfect For

- **Personal Trainers** looking to scale their business digitally
- **Fitness Studios** wanting to centralize client management
- **Online Coaches** seeking a platform to manage remote clients
- **Gym Owners** who need trainee progress tracking and workout assignment

---

## 🛠 Built With Modern Tech

| Layer | Technology |
|---|---|
| **Frontend Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Auth** | [Better-Auth](https://better-auth.com/) |
| **UI Icons** | [Heroicons](https://heroicons.com/) & [FontAwesome](https://fontawesome.com/) |
| **State Management** | [Zustand](https://zustand.surge.sh/) |
| **Validation** | [Zod](https://zod.dev/) |
| **Package Manager** | [pnpm](https://pnpm.io/) |

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- PostgreSQL database or cloud instance

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/menthaspicata/fit-app.git
cd fit-app

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env.local

# Set your database URL and auth secrets in .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/fit_app
NEXT_PUBLIC_BETTER_AUTH_SECRET=your_secret_here
```

# 4. Run database migrations
pnpm build

# 5. Start the development server  
pnpm dev

# 6. (Optional) Seed the exercise library
node import-exercises.js
```

Open [http://localhost:3000](http://localhost:3000) and start training! 🎉

---

## 📚 Available Scripts

```bash
pnpm dev        # Start dev server with hot reload
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint checks
```

---

## 🗄 Database Management

### Prisma Essentials

```bash
# Explore your database visually
pnpm prisma studio

# Create a new migration after schema changes
pnpm prisma migrate dev --name your_migration_name

# Check migration status
pnpm prisma migrate status

# Reset database (development only!)
pnpm prisma migrate reset
```

### Key Data Models

- **Users** — Trainers and trainees with role-based access
- **Workouts** — Custom workout plans created by trainers
- **Exercises** — 500+ exercise library with muscle groups and descriptions
- **UserWorkouts** — Assignments of workouts to trainees
- **Invites** — Secure trainer-to-trainee invitation tokens

---

## 🎨 Core Features Deep Dive

### 🏋️ For Trainers

- Create and customize workout programs
- Assign workouts to multiple trainees at once
- Monitor client progress with performance dashboards
- Build and manage your exercise library
- Track measurement history
- Invite clients via secure token links

### 👤 For Trainees

- Access your personalized workout plans
- Log completed workouts and sets
- Track body measurements over time
- View your full workout history
- Receive workout updates from your trainer
- Clean, distraction-free UI for training

---

## 📁 Project Architecture

```
fit-app/
├── prisma/
│   ├── schema.prisma         # Complete database schema
│   └── migrations/           # Database migration history
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API routes & auth endpoints
│   │   ├── dashboard/        # Trainer & trainee dashboards
│   │   ├── login/            # Authentication pages
│   │   ├── registration/     # User signup
│   │   └── invite/           # Trainee invitation system
│   ├── components/           # Reusable React components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout & navigation
│   │   └── ui/               # Basic UI components
│   ├── features/             # Feature-specific components
│   │   ├── exercises/        # Exercise library
│   │   ├── workouts/         # Workout management
│   │   ├── trainees/         # Trainee management
│   │   ├── schedule/         # Scheduling
│   │   └── invites/          # Invitation system
│   ├── lib/                  # Utilities & helpers
│   │   └── actions/          # Server actions
│   ├── store/                # Zustand state management
│   └── types/                # TypeScript type definitions
├── exercises.json            # Exercise database
└── package.json
```

---

## 🔐 Security Features

✅ **Secure Authentication** — Password hashing with bcrypt  
✅ **Role-Based Access Control** — Separate trainer/trainee permissions  
✅ **Invitation Tokens** — Unique, secure links for trainee onboarding  
✅ **Session Management** — Secure session handling with expiration  
✅ **Environment Variables** — Sensitive data protected via .env  

---

## 🌱 Getting Involved

We'd love your contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Tips

- Follow TypeScript best practices
- Use Tailwind CSS for styling (no inline styles)
- Keep components small and focused
- Write server actions in `src/lib/actions/`
- Test on mobile devices before submitting PRs

---

## 📞 Support & Contact

Have questions or need help?

- 📧 **Email** — [kseniyakartman@gmail.com](mailto:kseniyakartman@gmail.com)
- ⌨️ **Telegram** — [@mentha_spicata](https://t.me/mentha_spicata)
- 💬 **Discussions** — Open a GitHub Discussion
- 🐛 **Issues** — Report bugs by opening a GitHub Issue

---


**Built with ❤️**

[Star ⭐ this repo if you find it useful!](https://github.com/menthaspicata/fit-app)