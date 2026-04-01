'use client'

import styles from "@/app/landing.module.css";
import { useTheme } from "@/app/ThemeContext";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`
        relative flex items-center gap-2 px-3 py-2 rounded-xl w-fit
        border transition-all cursor-pointer
        ${isDark
          ? "border-white/[0.08] bg-white/[0.04] text-purple-200/55 hover:border-violet-400/50 hover:bg-white/[0.08]"
          : "border-violet-200 bg-violet-50 text-violet-700 hover:border-violet-400 hover:bg-violet-100"
        }
        ${styles.themeToggle}
      `}
    >
      {/* Track */}
      <div
        className={`
          relative w-9 h-5 rounded-full flex-shrink-0
          ${isDark ? "bg-violet-700" : "bg-violet-200"}
          ${styles.toggleTrack}
        `}
      >
        {/* Thumb */}
        <div
          className={`
            absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm
            ${isDark ? "translate-x-4" : "translate-x-0"}
            ${styles.toggleThumb}
          `}
        />
      </div>

      {/* Icon + label */}
      <span className="text-sm leading-none select-none">
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
