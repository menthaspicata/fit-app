"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/landing.module.css";
import Link from "next/link";
import Image from "next/image";
import { ThemeProvider, useTheme } from "@/app/ThemeContext";
import { ThemeToggle } from "@/components/layout/theme-toggle";



// ─────────────────────────────────────────
// NavBar
// ─────────────────────────────────────────

function NavBar() {
  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50
      flex items-center justify-between px-6 md:px-15 py-4
      backdrop-blur-xl border-b
      bg-white/80 border-violet-100
      dark:bg-[rgba(13,10,26,0.85)] dark:border-white/[0.08]
      transition-colors duration-300
    `}>
      <a
        href="#"
        className={`flex items-center gap-2.5 no-underline ${styles.fontSyne} font-extrabold text-xl
          text-violet-900 dark:text-white`}
      >
        <div className="w-9 h-9 bg-violet-700 rounded-xl flex items-center justify-center">
          <Image src="./logo.svg" alt="ConnectFit logo" width={64} height={64} className="object-cover w-full h-full" />
        </div>
          <p className="hidden md:block">ConnectFit</p>
      </a>

      <ul className="hidden md:flex gap-9 list-none">
        {["Features", "How it works"].map((label, i) => (
          <li key={i}>
            <a
              href={`#${label.toLowerCase().replace(/ /g, "-")}`}
              className="no-underline text-sm font-normal tracking-tight transition-colors
                text-violet-600 hover:text-violet-900
                dark:text-purple-200/55 dark:hover:text-white"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        

        <Link
          href="/login"
          className="px-5 py-2 rounded-xl border text-sm transition-all no-underline
            border-violet-200 text-violet-600 hover:border-violet-400 hover:text-violet-900 bg-transparent
            dark:border-white/[0.08] dark:text-purple-200/55 dark:hover:border-violet-400 dark:hover:text-white"
        >
          Sign In
        </Link>
        <Link
          href="/registration"
          className={`px-5 py-2 rounded-xl bg-violet-700 text-white text-sm font-medium no-underline ${styles.btnPrimary}`}
        >
          Start Free
        </Link>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────
// App Mockup (always light-UI inside)
// ─────────────────────────────────────────

function AppMockup() {
  const navItems = [
    { icon: "🏠", label: "Home", active: true },
    { icon: "🏋️", label: "Workouts" },
    { icon: "🏃", label: "Trainees" },
    { icon: "📋", label: "Invites" },
    { icon: "👤", label: "Profile" },
  ];

  const scheduleRows = [
    { time: "18:42", initials: "SP", name: "Sam Patel", status: "Upcoming", statusClass: "bg-purple-100 text-violet-700" },
    { time: "17:19", initials: "JL", name: "Jordan Lee", status: "Completed", statusClass: "bg-emerald-100 text-emerald-700" },
  ];

  return (
    <div className={`relative w-full max-w-5xl mt-20 hidden lg:block ${styles.animateFadeUpD4}`}>
      {/* Frame — subtle in light, dramatic in dark */}
      <div className="
        rounded-2xl overflow-hidden
        border border-violet-200 shadow-[0_32px_80px_rgba(124,58,237,0.12)]
        dark:border-white/10 dark:shadow-[0_60px_120px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)]
        bg-white dark:bg-[#1C1530]
      ">
        {/* Window bar */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b bg-gray-50 border-gray-100 dark:bg-white/[0.04] dark:border-white/[0.08]">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          <div className="flex-1 flex justify-center">
            <span className="
              rounded-md px-3.5 py-1 text-xs
              bg-gray-100 border border-gray-200 text-gray-500
              dark:bg-white/[0.06] dark:border-white/[0.08] dark:text-purple-200/55
            ">
              connect-fitness.vercel.app/dashboard
            </span>
          </div>
        </div>

        {/* App screen — always light UI */}
        <div className={styles.mockupScreen}>
          <aside className="w-[220px] min-w-[220px] bg-white flex flex-col border-r border-gray-100">
            <div className={`flex items-center gap-2 px-5 py-5 border-b border-gray-100 ${styles.fontSyne} font-extrabold text-[0.95rem] text-[#1a1a2e]`}>
              <div className="w-7 h-7 rounded-lg bg-violet-700 flex items-center justify-center text-xs text-white">
                <Image src="./logo.svg" alt="ConnectFit logo" width={64} height={64} className="object-cover w-full h-full" />
              </div>
              <div>
                ConnectFit
                <span className="block text-[0.6rem] font-normal text-gray-400">Trainer Portal</span>
              </div>
            </div>
            <nav className="flex flex-col gap-1 p-3">
              {navItems.map(({ icon, label, active }) => (
                <div key={label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[0.82rem] cursor-pointer ${active ? "bg-purple-100 text-violet-700 font-semibold" : "text-gray-500"}`}>
                  <span>{icon}</span> {label}
                </div>
              ))}
            </nav>
            <div className="mt-auto flex items-center gap-2 px-4 py-3 border-t border-gray-100">
              <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-[0.65rem] text-white font-bold">JD</div>
              <div>
                <div className="text-[0.75rem] font-semibold text-gray-800">Jhon Doe</div>
                <div className="text-[0.62rem] text-gray-400 uppercase tracking-widest">Trainer</div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <span className={`${styles.fontSyne} font-bold text-[1.1rem] text-gray-800`}>Welcome, Jhon Doe 👋</span>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 bg-violet-700 text-white text-[0.72rem] font-medium rounded-lg px-3 py-1.5">+ Create Trainee</button>
                <button className="flex items-center gap-1 bg-white border border-gray-200 text-gray-700 text-[0.72rem] rounded-lg px-3 py-1.5">+ Create Workout</button>
              </div>
            </div>
            <div className="flex gap-3 mb-4">
              {[
                { icon: "👥", num: "6",  label: "Total Trainees" },
                { icon: "🏋️", num: "14", label: "Active Workouts" },
                { icon: "📋", num: "2",  label: "Workouts Today" },
              ].map(({ icon, num, label }) => (
                <div key={label} className="flex-1 bg-white rounded-xl p-3.5 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-sm mb-2">{icon}</div>
                  <div className={`${styles.fontSyne} font-extrabold text-[1.4rem] text-gray-800`}>{num}</div>
                  <div className="text-[0.7rem] text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className={`${styles.fontSyne} font-bold text-[0.82rem] text-gray-800 mb-3`}>Today's Schedule — 23 March 2026</div>
              {scheduleRows.map(({ time, initials, name, status, statusClass }) => (
                <div key={name} className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-[0.72rem] text-gray-500 font-medium w-10">{time}</span>
                  <div className="w-6 h-6 rounded-full bg-violet-700 flex items-center justify-center text-[0.6rem] text-white font-bold">{initials}</div>
                  <span className="text-[0.78rem] font-medium text-gray-800 flex-1">{name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[0.64rem] font-semibold ${statusClass}`}>{status}</span>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Hero
// ─────────────────────────────────────────

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-15 pt-28 pb-20 relative overflow-hidden">
      <div className={styles.heroGlowTop} />
      <div className={styles.heroGlowBottom} />

      <div className={`
        inline-flex items-center gap-2 px-4 py-1.5 rounded-full border font-medium tracking-wide mb-8 text-[0.82rem]
        border-violet-300 bg-violet-100 text-violet-700
        dark:border-violet-500/40 dark:bg-violet-700/10 dark:text-violet-400
        ${styles.animateFadeUp}
      `}>
        <span className={`w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400 ${styles.badgeDot}`} />
        Now available for all fitness professionals
      </div>

      <h1 className={`${styles.fontSyne} text-[clamp(3rem,7vw,6rem)] font-extrabold text-center leading-[1.02] tracking-[-0.02em] max-w-[900px] ${styles.animateFadeUpD1}`}>
        <span className={styles.gradientText}>Train smarter.<br />Connect deeper.</span>
      </h1>

      <p className={`
        max-w-[560px] text-center text-[1.1rem] font-light leading-[1.7] mt-6 mb-11
        text-violet-700/60 dark:text-purple-200/55
        ${styles.fontDM} ${styles.animateFadeUpD2}
      `}>
        ConnectFit is the all-in-one trainer portal — build workouts, manage trainees, and track every session in real time.
      </p>

      <div className={`flex gap-3.5 ${styles.animateFadeUpD3}`}>
        <Link
          href="/registration"
          className={`px-8 py-3.5 rounded-xl bg-violet-700 text-white text-base font-medium no-underline ${styles.btnHero}`}
        >
          Get Started Free
        </Link>
        <a
          href="#features"
          className="px-8 py-3.5 rounded-xl bg-transparent text-base font-normal no-underline transition-all
            border border-violet-300 text-violet-600 hover:border-violet-500 hover:text-violet-900
            dark:border-white/15 dark:text-purple-200/55 dark:hover:border-violet-400 dark:hover:text-white"
        >
          See Features →
        </a>
      </div>

      <AppMockup />
    </section>
  );
}

// ─────────────────────────────────────────
// Mini mockups (always light-UI inside cards)
// ─────────────────────────────────────────

function WorkoutBuilderMockup() {
  const exercises = [
    { name: "Bench Press",      detail: "3 sets × 40 kg", selected: true },
    { name: "Board Press",      detail: "2 sets × 35 kg", selected: true },
    { name: "Cable Chest Press",detail: "Add exercise",   selected: false },
  ];
  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-gray-100 dark:border-white/[0.08] bg-[#ecf0f4]">
      <div className="flex items-center gap-1.5 px-3.5 py-2 bg-white border-b border-gray-200">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" /><span className="w-2 h-2 rounded-full bg-[#FEBC2E]" /><span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="text-[0.68rem] text-gray-400 ml-1.5">Create Workout</span>
      </div>
      <div className="p-2.5 flex flex-col gap-1.5">
        {exercises.map(({ name, detail, selected }) => (
          <div key={name} className={`flex items-center gap-2.5 bg-white rounded-lg px-3 py-2 ${!selected ? "opacity-50" : ""}`}>
            <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center text-[0.65rem] text-violet-700">🏋️</div>
            <span className="text-[0.73rem] font-semibold text-gray-800 flex-1">{name}</span>
            <span className="text-[0.65rem] text-gray-400">{detail}</span>
            <span className={`text-[0.75rem] ${selected ? "text-violet-700" : "text-gray-400"}`}>{selected ? "✓" : "+"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveTimerMockup() {
  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-gray-100 dark:border-white/[0.08] bg-[#ecf0f4]">
      <div className="flex items-center gap-1.5 px-3.5 py-2 bg-white border-b border-gray-200">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" /><span className="w-2 h-2 rounded-full bg-[#FEBC2E]" /><span className="w-2 h-2 rounded-full bg-[#28C840]" />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <div className="text-[0.65rem] font-bold text-gray-500 tracking-widest uppercase">Chest Workout</div>
            <div className={`${styles.fontSyne} text-[1.4rem] font-extrabold text-gray-800`}>00:08</div>
          </div>
          <div className="w-9 h-9 rounded-full border-[3px] border-violet-700 flex items-center justify-center text-[0.62rem] font-bold text-violet-700">2/3</div>
        </div>
        <div className="h-1 bg-gray-200 rounded-full mb-2.5 overflow-hidden">
          <div className={styles.timerProgressFill} />
        </div>
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-2">
          <span className="text-[0.65rem] font-semibold text-amber-800 uppercase tracking-wide">Rest Timer</span>
          <span className={`${styles.fontSyne} text-[0.9rem] font-extrabold text-amber-600`}>01:27</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
          <div className="w-5 h-5 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-[0.6rem] text-emerald-600">✓</div>
          <span className="text-[0.72rem] font-semibold text-gray-800 flex-1">Band-Assisted Bench Press</span>
          <span className="px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[0.58rem] font-semibold">Chest</span>
        </div>
      </div>
    </div>
  );
}

function TraineesMockup() {
  const trainees = [
    { initials: "AS", name: "Alex Smith",   email: "alex.smith@example.com" },
    { initials: "MG", name: "Maria Garcia", email: "maria.garcia@example.com" },
    { initials: "JL", name: "Jordan Lee",   email: "jordan.lee@example.com" },
  ];
  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-gray-100 dark:border-white/[0.08] bg-[#ecf0f4]">
      <div className="flex items-center gap-1.5 px-3.5 py-2 bg-white border-b border-gray-200">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" /><span className="w-2 h-2 rounded-full bg-[#FEBC2E]" /><span className="w-2 h-2 rounded-full bg-[#28C840]" />
      </div>
      <div className="p-2.5 flex flex-col gap-1.5">
        {trainees.map(({ initials, name, email }) => (
          <div key={name} className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2">
            <div className="relative w-7 h-7 rounded-lg bg-violet-700 flex items-center justify-center text-[0.62rem] text-white font-bold flex-shrink-0">
              {initials}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
            </div>
            <div>
              <div className="text-[0.75rem] font-semibold text-gray-800">{name}</div>
              <div className="text-[0.65rem] text-gray-400">{email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InviteMockup() {
  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-gray-100 dark:border-white/[0.08] bg-[#ecf0f4] max-w-xs">
      <div className="flex items-center gap-1.5 px-3.5 py-2 bg-white border-b border-gray-200">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" /><span className="w-2 h-2 rounded-full bg-[#FEBC2E]" /><span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="text-[0.68rem] text-gray-400 ml-1.5">Create Trainee</span>
      </div>
      <div className="p-3">
        <div className="text-[0.65rem] font-bold text-gray-500 tracking-widest uppercase mb-1.5">Trainee Name</div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[0.7rem] text-gray-400 mb-2">e.g. Sofia Morlaunt</div>
        <button className="w-full bg-violet-700 text-white border-none rounded-lg py-2 text-[0.72rem] font-semibold flex items-center justify-center gap-1.5">
          ✉️ Generate Invite Link
        </button>
        <div className="mt-2 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <span className="text-emerald-500">✓</span>
          <span className="text-[0.7rem] font-semibold text-emerald-800">Invite link ready! Expires in 7 days.</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Features Section
// ─────────────────────────────────────────

const FEATURES = [
  { icon: "🏋️", title: "Powerful Workout Builder",  desc: "Search hundreds of exercises from a curated library, build structured programs with sets, reps, and weight targets, then assign them to any trainee in seconds.", mockup: <WorkoutBuilderMockup />, span: "md:col-span-7" },
  { icon: "⏱️", title: "Live Workout Mode",          desc: "Trainees follow along in real time with a guided exercise view, auto rest timer, and progress tracking per set.",                                             mockup: <LiveTimerMockup />,     span: "md:col-span-5" },
  { icon: "👥", title: "Trainee Management",         desc: "Keep your full client roster organized. See who's active, browse workout history, and manage all trainees from a single clean view.",                       mockup: <TraineesMockup />,      span: "md:col-span-5" },
  { icon: "✉️", title: "One-Click Invite System",    desc: "Generate a personal invite link, send it any way you like, and your trainee is on your roster the moment they accept. Links expire automatically.",         mockup: <InviteMockup />,        span: "md:col-span-7" },
  { icon: "📅", title: "Daily Schedule View",        desc: "See every training session at a glance — who's up next, who's done, and what's coming tomorrow.",                                                            span: "md:col-span-4" },
  { icon: "📊", title: "Status Tracking",            desc: "Upcoming, In Progress, Completed — every workout status updates in real time so nothing slips through the cracks.",                                          span: "md:col-span-4" },
  { icon: "📚", title: "Exercise Library",           desc: "Hundreds of categorized exercises ready to use. Search, browse by muscle group, and build routines fast.",                                                   span: "md:col-span-4" },
];

function FeaturesSection() {
  return (
    <section id="features" className="max-w-[1200px] mx-auto px-6 md:px-15 py-24">
      <div className={`flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.1em] uppercase text-violet-500 dark:text-violet-400 mb-4 ${styles.sectionLabel}`}>
        Features
      </div>
      <h2 className={`${styles.fontSyne} text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.02em] mb-4
        text-violet-950 dark:text-[#F0EDFF]`}>
        Everything a trainer<br />needs in one place.
      </h2>
      <p className={`${styles.fontDM} text-[1.05rem] font-light leading-[1.7] max-w-[520px] mb-14
        text-violet-700/60 dark:text-purple-200/55`}>
        Designed for real fitness professionals — from solo coaches to growing studios.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {FEATURES.map(({ icon, title, desc, mockup, span }) => (
          <div
            key={title}
            className={`
              ${span} rounded-[18px] p-8
              border
              bg-white border-violet-100 shadow-sm
              dark:bg-white/[0.04] dark:border-white/[0.08]
              ${styles.featureCard}
            `}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5
              bg-violet-100 border border-violet-200
              dark:bg-violet-900/30 dark:border-violet-700/25">
              {icon}
            </div>
            <h3 className={`${styles.fontSyne} text-[1.15rem] font-bold tracking-[-0.01em] mb-2.5
              text-violet-950 dark:text-[#F0EDFF]`}>
              {title}
            </h3>
            <p className={`${styles.fontDM} text-[0.9rem] font-light leading-[1.65]
              text-violet-700/60 dark:text-purple-200/55`}>
              {desc}
            </p>
            {mockup}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// How It Works
// ─────────────────────────────────────────

const STEPS = [
  {
    num: "1", label: "Step 01",
    title: "Create your trainer profile",
    desc: "Sign up, set up your profile, and you're in. Your personal Trainer Portal is ready immediately — no installation, no configuration required.",
    visual: (
      <div className="flex flex-col items-center gap-3 relative z-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-700 to-violet-400 flex items-center justify-center text-[1.5rem] font-extrabold text-white">JD</div>
        <div className="text-center">
          <div className={`${styles.fontSyne} font-bold text-[1.05rem] text-violet-950 dark:text-[#F0EDFF]`}>Jhon Doe</div>
          <div className="text-[0.78rem] text-violet-600/60 dark:text-purple-200/55">Certified Personal Trainer</div>
          <div className="mt-2 px-3 py-1 rounded-full text-[0.7rem] inline-block
            bg-violet-100 border border-violet-300 text-violet-700
            dark:bg-violet-700/15 dark:border-violet-700/30 dark:text-violet-400">
            ✓ Profile Active
          </div>
        </div>
      </div>
    ),
  },
  {
    num: "2", label: "Step 02", reverse: true,
    title: "Build your first workout",
    desc: "Pick exercises from the built-in library, define sets, reps, and weight. Give it a name, pick a date, and assign it to a trainee. Done in under 2 minutes.",
    visual: (
      <div className="relative z-10 w-full">
        <div className="rounded-xl p-4
          bg-violet-50 border border-violet-100
          dark:bg-white/[0.06] dark:border-white/[0.08]">
          <div className="text-[0.68rem] tracking-widest mb-2.5 uppercase
            text-violet-500 dark:text-purple-200/55">
            Exercise Library
          </div>
          {[
            { name: "Bench Press",      selected: true },
            { name: "Cable Chest Press", selected: false },
            { name: "Board Press",      selected: true },
          ].map(({ name, selected }) => (
            <div key={name} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg mb-1.5
              ${selected
                ? "bg-violet-100 border border-violet-200 dark:bg-violet-700/12 dark:border-violet-700/20"
                : "bg-white/60 dark:bg-white/[0.04]"
              }`}>
              <span className="text-[0.7rem]">🏋️</span>
              <span className={`text-[0.78rem] flex-1 text-violet-900 dark:text-[#F0EDFF] ${selected ? "font-semibold" : ""}`}>{name}</span>
              <span className={`text-[0.75rem] ${selected ? "text-violet-600 dark:text-violet-400" : "text-violet-400/50 dark:text-purple-200/55"}`}>
                {selected ? "✓" : "+"}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "3", label: "Step 03",
    title: "Invite your trainees",
    desc: "Generate a unique invite link for each client. They accept, create an account, and appear in your roster automatically. No back-and-forth, no forms.",
    visual: (
      <div className="relative z-10 text-center">
        <div className="text-[0.7rem] tracking-widest mb-3 uppercase text-violet-500 dark:text-purple-200/55">
          Invite Link Ready
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-2.5
          bg-emerald-100 border-2 border-emerald-500
          dark:bg-emerald-500/15">
          ✓
        </div>
        <div className="text-[0.8rem] font-semibold mb-1.5 text-emerald-600 dark:text-emerald-400">
          Link expires in 7 days
        </div>
        <div className="rounded-lg px-3 py-1.5 text-[0.7rem]
          bg-violet-50 border border-violet-100 text-violet-600
          dark:bg-white/[0.05] dark:border-white/[0.08] dark:text-purple-200/55">
          connect-fitness.vercel.app/invite/57f0a8fb…
        </div>
      </div>
    ),
  },
  {
    num: "4", label: "Step 04", reverse: true,
    title: "Track workouts live",
    desc: "When a session starts, you and your trainee follow every exercise, every set, and every rest period in real time. Volume, reps, and completion — all logged automatically.",
    visual: (
      <div className="relative z-10 w-full">
        <div className="rounded-xl p-3.5
          bg-violet-50 border border-violet-100
          dark:bg-white/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[0.62rem] tracking-widest uppercase text-violet-500 dark:text-purple-200/55">Chest Workout</div>
              <div className={`${styles.fontSyne} text-[1.3rem] font-extrabold text-violet-950 dark:text-[#F0EDFF]`}>00:24</div>
            </div>
            <div className="w-9 h-9 rounded-full border-[3px] border-violet-700 flex items-center justify-center text-[0.6rem] font-bold text-violet-700 dark:text-violet-400">2/3</div>
          </div>
          <div className="h-0.5 rounded-full mb-2.5 overflow-hidden bg-violet-200 dark:bg-white/[0.08]">
            <div className="h-full w-[70%] bg-violet-700 rounded-full" />
          </div>
          {[
            { label: "Assisted Dip",              done: true,  detail: "1/1 sets" },
            { label: "Band-Assisted Bench Press", active: true },
            { label: "Bar Dip",                  pending: true, detail: "0/1 sets" },
          ].map(({ label, done, active, detail }) => (
            <div key={label} className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg mb-1
              ${done
                ? "bg-emerald-50 dark:bg-emerald-500/08"
                : active
                  ? "bg-violet-100 border border-violet-200 dark:bg-violet-700/12 dark:border-violet-700/20"
                  : "bg-white/50 dark:bg-white/[0.03]"
              }`}>
              <span className={`text-[0.75rem] ${done ? "text-emerald-600 dark:text-emerald-400" : "text-violet-400/60 dark:text-purple-200/55"}`}>
                {done ? "✓" : active ? "✓" : "3"}
              </span>
              <span className={`text-[0.72rem] flex-1
                ${done
                  ? "line-through text-violet-400 dark:text-purple-200/55"
                  : active
                    ? "font-semibold text-violet-950 dark:text-[#F0EDFF]"
                    : "text-violet-500/70 dark:text-purple-200/55"
                }`}>
                {label}
              </span>
              {detail && <span className="text-[0.62rem] text-violet-400 dark:text-purple-200/55">{detail}</span>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function HowItWorksSection() {
  return (
    <div className="border-t border-b border-violet-100 bg-violet-50/50 dark:border-white/[0.08] dark:bg-white/[0.015]" id="how-it-works">
      <section className="max-w-[1100px] mx-auto px-6 md:px-15 py-24">
        <div className={`flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.1em] uppercase text-violet-500 dark:text-violet-400 mb-4 ${styles.sectionLabel}`}>
          How It Works
        </div>
        <h2 className={`${styles.fontSyne} text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.02em] mb-4
          text-violet-950 dark:text-[#F0EDFF]`}>
          Up and running in minutes.
        </h2>
        <p className={`${styles.fontDM} text-[1.05rem] font-light leading-[1.7] max-w-[520px] mb-0
          text-violet-700/60 dark:text-purple-200/55`}>
          No complicated setup. Just sign up and start training your clients.
        </p>

        <div className="flex flex-col">
          {STEPS.map(({ num, label, title, desc, visual, reverse }, i) => (
            <div
              key={num}
              className={`
                grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] items-center py-15
                border-b border-violet-100 dark:border-white/[0.08] last:border-0
                ${reverse ? "md:[&>*:first-child]:order-3 md:[&>*:nth-child(2)]:order-2 md:[&>*:last-child]:order-1" : ""}
              `}
            >
              {/* Text */}
              <div className="px-0 md:px-10">
                <div className="text-[0.75rem] font-semibold tracking-[0.1em] uppercase mb-2.5
                  text-violet-500 dark:text-violet-400">
                  {label}
                </div>
                <h3 className={`${styles.fontSyne} text-[1.6rem] font-extrabold tracking-[-0.02em] mb-3.5
                  text-violet-950 dark:text-[#F0EDFF]`}>
                  {title}
                </h3>
                <p className={`${styles.fontDM} text-[0.95rem] leading-[1.7] font-light
                  text-violet-700/60 dark:text-purple-200/55`}>
                  {desc}
                </p>
              </div>

              {/* Step number */}
              <div className="hidden md:flex flex-col items-center gap-0">
                <div className="w-14 h-14 rounded-full border-2 border-violet-600 flex items-center justify-center font-extrabold text-[1.1rem]
                  bg-violet-100 text-violet-700
                  dark:bg-violet-700/10 dark:text-violet-400">
                  {num}
                </div>
                {i < STEPS.length  && <div className={styles.stepLine} />}
              </div>

              {/* Visual card */}
              <div className={`
                rounded-2xl p-5 min-h-[240px] flex items-center justify-center relative overflow-hidden
                border border-violet-100 bg-white shadow-sm
                dark:bg-white/[0.04] dark:border-white/[0.08]
                ${styles.stepVisual}
              `}>
                {visual}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────

const TESTIMONIALS = [
  { text: "I used to track everything in spreadsheets and WhatsApp. ConnectFit replaced all of that in my first week. My clients actually show up more prepared now.", name: "James Mullan", role: "Personal Trainer, Dublin",  initials: "JM", gradient: "from-violet-700 to-violet-400" },
  { text: "The live workout mode is a game-changer. My online clients can now follow the exact same session structure as my in-person clients. Total consistency.",     name: "Sofia Reyes",  role: "Online Coach, Barcelona",    initials: "SR", gradient: "from-violet-800 to-violet-600" },
  { text: "Onboarding a new client takes me 2 minutes now. I generate an invite, they join, I build their first workout — that's it. No friction at all.",             name: "Daniel Kos",   role: "Strength Coach, Warsaw",     initials: "DK", gradient: "from-violet-900 to-violet-700" },
];

function TestimonialsSection() {
  return (
    <div className="border-t border-b border-violet-100 bg-violet-50/30 dark:border-white/[0.08] dark:bg-white/[0.015]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-15 py-24">
        <div className={`flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.1em] uppercase text-violet-500 dark:text-violet-400 mb-4 ${styles.sectionLabel}`}>
          Testimonials
        </div>
        <h2 className={`${styles.fontSyne} text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.02em]
          text-violet-950 dark:text-[#F0EDFF]`}>
          Trainers love ConnectFit.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {TESTIMONIALS.map(({ text, name, role, initials, gradient }) => (
            <div
              key={name}
              className={`
                rounded-[18px] px-7 pt-7 pb-6
                border bg-white shadow-sm
                border-violet-100
                dark:bg-white/[0.04] dark:border-white/[0.08]
                ${styles.testimonialCard}
              `}
            >
              <div className="flex gap-1 mb-4 text-amber-400 text-[0.85rem]">★★★★★</div>
              <p className={`${styles.fontDM} text-[0.92rem] leading-[1.72] font-light mb-5
                text-violet-700/70 dark:text-purple-200/55`}>
                {text}
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-[0.8rem] text-white`}>
                  {initials}
                </div>
                <div>
                  <div className="font-semibold text-[0.88rem] text-violet-950 dark:text-[#F0EDFF]">{name}</div>
                  <div className="text-[0.75rem] text-violet-500/70 dark:text-purple-200/55">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// CTA
// ─────────────────────────────────────────

function CTASection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-15 pb-28 pt-8">
      <div className={`
        relative rounded-[28px] px-10 md:px-20 py-20 text-center overflow-hidden
        bg-gradient-to-br from-violet-100 to-violet-50 border border-violet-200
        dark:from-violet-700/15 dark:to-violet-500/[0.08] dark:border-violet-700/30
        ${styles.ctaBox}
      `}>
        <h2 className={`${styles.fontSyne} text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.02em] mb-4 relative z-10
          text-violet-950 dark:text-[#F0EDFF]`}>
          Ready to upgrade<br />your training business?
        </h2>
        <p className={`${styles.fontDM} text-[1.05rem] font-light max-w-[480px] mx-auto mb-9 leading-[1.7] relative z-10
          text-violet-700/60 dark:text-purple-200/55`}>
          Join hundreds of trainers who've ditched the spreadsheets and moved to ConnectFit.
        </p>
        <div className="flex gap-3.5 justify-center relative z-10">
          <Link
            href="/registration"
            className={`px-8 py-3.5 rounded-xl bg-violet-700 text-white text-base font-medium no-underline ${styles.btnHero}`}
          >
            Start for free →
          </Link>
          <Link
            href="/login"
            className="px-8 py-3.5 rounded-xl text-base font-normal no-underline transition-all
              bg-white border border-violet-300 text-violet-700 hover:border-violet-500
              dark:bg-transparent dark:border-white/15 dark:text-purple-200/55 dark:hover:border-violet-400 dark:hover:text-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Footer
// ─────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t px-6 md:px-15 py-12 flex flex-col md:flex-row items-center justify-between gap-6
      border-violet-100 dark:border-white/[0.08]">
      <a href="#" className={`flex items-center gap-2.5 no-underline ${styles.fontSyne} font-extrabold text-base
        text-violet-500 dark:text-purple-200/55`}>
        <div className="w-7 h-7 bg-violet-700 rounded-lg flex items-center justify-center text-sm">
          <Image src="./logo.svg" alt="ConnectFit logo" width={64} height={64} className="object-cover w-full h-full" />
        </div>
        <p>ConnectFit</p>
      </a>
      <div className="flex gap-8">
        {["Features", "Privacy", "Terms"].map((l) => (
          <a key={l} href="#" className="no-underline text-[0.85rem] transition-colors
            text-violet-500 hover:text-violet-900
            dark:text-purple-200/55 dark:hover:text-white">
            {l}
          </a>
        ))}
      </div>
      
      <div className="text-[0.8rem] opacity-50 text-violet-500 dark:text-purple-200/55">
        © 2026 ConnectFit. All rights reserved.
      </div>
      <ThemeToggle />
    </footer>
  );
}

// ─────────────────────────────────────────
// Main Page (inner — uses useTheme)
// ─────────────────────────────────────────

function LandingPageInner() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(styles.visible); }),
      { threshold: 0.12 }
    );
    const els = pageRef.current?.querySelectorAll(`.${styles.fadeUp}`);
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={pageRef}
      className={`${styles.fontDM} overflow-x-hidden min-h-screen
        bg-[#F5F3FF] text-violet-950
        dark:bg-[#0D0A1A] dark:text-[#F0EDFF]
        transition-colors duration-300`}
    >
      <div className={styles.noiseOverlay} />
      <NavBar />
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}


export default function ConnectFitLandingPage() {
  return (
    <ThemeProvider>
      <LandingPageInner />
    </ThemeProvider>
  );
}