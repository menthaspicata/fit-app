import { BackButton } from "@/components/ui/back-button";
import Link from "next/link";
import { Metadata } from "next";
import { getAllWorkouts } from "@/lib/actions/workout";
import { fetchUserData } from "@/lib/actions/user";
import { WorkoutList } from "@/features/workouts/workout-list";

export const metadata: Metadata = {
  title: "Workouts",
};

export default async function WorkoutPage() {
  const user = await fetchUserData();
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
            {allWorkouts.length} workout{allWorkouts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        {user?.role === "trainer" && (
          <Link
            href="/dashboard/create-workout"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[0.99] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-violet-200 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New Workout</span>
          </Link>
        )}
      </div>

      {/* ── Empty state ── */}
      {allWorkouts.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M6 5v14M18 5v14M6 12h12M3 7h3M3 17h3M18 7h3M18 17h3" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-400">No workouts yet</p>
          <p className="text-xs text-gray-300 mt-1 mb-5">
            Create your first workout to get started
          </p>
          <Link
            href="/dashboard/create-workout"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-violet-200 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Workout
          </Link>
        </div>
      )}

      {/* ── Workout list ── */}
      {allWorkouts.length > 0 && <WorkoutList workouts={allWorkouts} />}
    </div>
  );
}