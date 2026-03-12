import { BackButton } from "@/components/ui/back-button";
import Link from "next/link";
import { Metadata } from "next";
import { getAllWorkouts } from "@/lib/actions/workout";
import {
  fmtDate,
  fmtTime,
  initials,
  avatarGradient,
} from "@/features/trainees/helpers";

export const metadata: Metadata = {
  title: "Workouts",
};

export default async function WorkoutPage() {
  const allWorkouts = await getAllWorkouts();

  return (
    <div className="max-w-4xl mx-auto">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <BackButton />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Workouts
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            {allWorkouts.length} workout{allWorkouts.length !== 1 ? "s" : ""}{" "}
            total
          </p>
        </div>
        <Link
          href="/dashboard/create-workout"
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[0.99] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-violet-200 transition-all"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="hidden sm:inline">New Workout</span>
        </Link>
      </div>

      {/* ── Empty state ── */}
      {allWorkouts.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <svg
              className="w-7 h-7 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 5v14M18 5v14M6 12h12M3 7h3M3 17h3M18 7h3M18 17h3"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-400">No workouts yet</p>
          <p className="text-xs text-gray-300 mt-1 mb-5">
            Create your first workout to get started
          </p>
          <Link
            href="/dashboard/workouts/create"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-violet-200 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Workout
          </Link>
        </div>
      )}

      {/* ── Workout list ── */}
      {allWorkouts.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Table header — desktop */}
          <div className="hidden sm:grid grid-cols-[1fr_180px_140px_40px] items-center px-6 py-3 border-b border-gray-50">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
              Workout
            </span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
              Assigned To
            </span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
              Date
            </span>
            <span />
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {allWorkouts.map((workout) => {
              const assignedTo = workout.userWorkouts[0]?.user;

              return (
                <Link
                  key={workout.id}
                  href={`/dashboard/workouts/${workout.id}`}
                  className="group flex sm:grid sm:grid-cols-[1fr_180px_140px_40px] items-center gap-4 px-6 py-4 hover:bg-gray-50/60 transition-colors"
                >
                  {/* Workout name + icon */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 transition-colors">
                      <svg
                        className="w-4 h-4 text-violet-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 5v14M18 5v14M6 12h12M3 7h3M3 17h3M18 7h3M18 17h3"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-violet-700 transition-colors">
                        {workout.name}
                      </p>
                      {/* Mobile: show date + assignee below name */}
                      <p className="sm:hidden text-xs text-gray-400 mt-0.5">
                        {fmtDate(workout.date)}
                        {assignedTo && ` · ${assignedTo.name}`}
                      </p>
                    </div>
                  </div>

                  {/* Assigned to — desktop */}
                  <div className="hidden sm:flex items-center gap-2 min-w-0">
                    {assignedTo ? (
                      <>
                        <div
                          className={`w-6 h-6 rounded-lg bg-gradient-to-br ${avatarGradient(assignedTo.name)} flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0`}
                        >
                          {initials(assignedTo.name)}
                        </div>
                        <span className="text-sm text-gray-600 truncate">
                          {assignedTo.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        Unassigned
                      </span>
                    )}
                  </div>

                  {/* Date — desktop */}
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-600">
                      {fmtDate(workout.date)}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {fmtTime(workout.date)}
                    </p>
                  </div>

                  {/* Chevron */}
                  <div className="hidden sm:flex items-center justify-end">
                    <svg
                      className="w-4 h-4 text-gray-300 group-hover:text-violet-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}