"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { fmtDate, fmtTime, initials, avatarGradient } from "@/features/helpers";

type SortField = "none" | "date" | "user" | "status";
type SortDir = "asc" | "desc";

interface UserWorkout {
  user: { name: string } | null;
  status?: string | null;
}

interface Workout {
  id: string;
  name: string;
  date: string | Date | null;
  userWorkouts: UserWorkout[];
}

interface WorkoutListProps {
  workouts: Workout[];
}

const STATUSES = [
  {
    value: "assigned",
    label: "Upcoming",
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    value: "in_progress",
    label: "In Progress",
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    value: "completed",
    label: "Completed",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
] as const;

const SORT_SELECT_OPTIONS: { value: SortField; label: string }[] = [
  { value: "none",   label: "No sort" },
  { value: "date",   label: "Date" },
  { value: "user",   label: "User" },
  { value: "status", label: "Status" },
];

function StatusBadge({ status }: { status?: string | null }) {
  const match = STATUSES.find((s) => s.value === status);
  if (!match) return null;
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${match.color}`}>
      {match.label}
    </span>
  );
}

export function WorkoutList({ workouts }: WorkoutListProps) {
  const [sortField, setSortField] = useState<SortField>("none");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Unique statuses present in the data
  const presentStatuses = useMemo(() => {
    const set = new Set<string>();
    workouts.forEach((w) => {
      const s = w.userWorkouts[0]?.status;
      if (s != null) set.add(s);
    });
    return STATUSES.filter((s) => set.has(s.value));
  }, [workouts]);

  const processed = useMemo(() => {
    let list = [...workouts];

    // Filter by status
    if (statusFilter !== "all") {
      list = list.filter((w) => (w.userWorkouts[0]?.status ?? null) === statusFilter);
    }

    // Sort
    if (sortField !== "none") {
      list.sort((a, b) => {
        let cmp = 0;
        if (sortField === "date") {
          cmp = new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime();
        } else if (sortField === "user") {
          const nameA = a.userWorkouts[0]?.user?.name ?? "zzz";
          const nameB = b.userWorkouts[0]?.user?.name ?? "zzz";
          cmp = nameA.localeCompare(nameB);
        } else if (sortField === "status") {
          const order = ["in_progress", "assigned", "completed"];
          const ia = order.indexOf((a.userWorkouts[0]?.status ?? "").toLowerCase());
          const ib = order.indexOf((b.userWorkouts[0]?.status ?? "").toLowerCase());
          cmp = (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        }
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return list;
  }, [workouts, sortField, sortDir, statusFilter]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-2 px-6 py-3 border-b border-gray-50 bg-gray-50/50">

        {/* Sort select + direction toggle */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Sort</span>
          <div className="relative">
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="appearance-none text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 cursor-pointer hover:border-violet-300 focus:outline-none focus:border-violet-400 transition-colors"
            >
              {SORT_SELECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {sortField !== "none" && (
            <button
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="flex items-center gap-1 text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 hover:border-violet-300 hover:text-violet-600 transition-colors"
              title={sortDir === "asc" ? "Ascending" : "Descending"}
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${sortDir === "asc" ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
              {sortDir === "asc" ? "Asc" : "Desc"}
            </button>
          )}
        </div>

        {/* Divider */}
        {presentStatuses.length > 0 && (
          <div className="w-px h-4 bg-gray-200 mx-1" />
        )}

        {/* Status filter pills */}
        {presentStatuses.length > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Filter</span>
            <button
              onClick={() => setStatusFilter("all")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                statusFilter === "all"
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
              }`}
            >
              All
            </button>
            {presentStatuses.map((s) => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(statusFilter === s.value ? "all" : s.value)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                  statusFilter === s.value
                    ? `${s.color} border-current`
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Table header — desktop ── */}
      <div className="hidden sm:grid grid-cols-[1fr_180px_120px_140px_40px] items-center px-6 py-3 border-b border-gray-50">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Workout</span>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Assigned To</span>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Status</span>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Date</span>
        <span />
      </div>

      {/* ── Rows ── */}
      <div className="divide-y divide-gray-50">
        {processed.map((workout) => {
          const assignedTo = workout.userWorkouts[0]?.user;
          return (
            <Link
              key={workout.id}
              href={`/dashboard/workouts/${workout.id}`}
              className="group flex sm:grid sm:grid-cols-[1fr_180px_120px_140px_40px] items-center gap-4 px-6 py-4 hover:bg-gray-50/60 transition-colors"
            >
              {/* Name + icon */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 transition-colors">
                  <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M6 5v14M18 5v14M6 12h12M3 7h3M3 17h3M18 7h3M18 17h3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-violet-700 transition-colors">
                    {workout.name}
                  </p>
                  {/* Mobile: date + assignee + status */}
                  <p className="sm:hidden text-xs text-gray-400 mt-0.5">
                    {workout.date ? fmtDate(new Date(workout.date)) : "—"}
                    {assignedTo && ` · ${assignedTo.name}`}
                  </p>
                  <div className="sm:hidden mt-1">
                    <StatusBadge status={workout.userWorkouts[0]?.status} />
                  </div>
                </div>
              </div>

              {/* Assigned to — desktop */}
              <div className="hidden sm:flex items-center gap-2 min-w-0">
                {assignedTo ? (
                  <>
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${avatarGradient(assignedTo.name)} flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0`}>
                      {initials(assignedTo.name)}
                    </div>
                    <span className="text-sm text-gray-600 truncate">{assignedTo.name}</span>
                  </>
                ) : (
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Unassigned</span>
                )}
              </div>

              {/* Status — desktop */}
              <div className="hidden sm:flex items-center">
                <StatusBadge status={workout.userWorkouts[0]?.status} />
              </div>

              {/* Date — desktop */}
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">{workout.date ? fmtDate(new Date(workout.date)) : "—"}</p>
                <p className="text-xs text-gray-400 mt-0.5">{workout.date ? fmtTime(new Date(workout.date)) : ""}</p>
              </div>

              {/* Chevron */}
              <div className="hidden sm:flex items-center justify-end">
                <svg className="w-4 h-4 text-gray-300 group-hover:text-violet-400 transition-colors"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}