import { Metadata } from "next";
import Link from "next/link";
import { fetchUserData } from "@/lib/actions/user";
import Schedule from "@/features/schedule/schedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatCard } from "@/features/dashboard/stat-card";
import {
  faPlus,
  faUsers,
  faDumbbell,
  faChartBar,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { getDashboardStats } from "@/lib/actions/workout";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const [userData, stats] = await Promise.all([
    fetchUserData(),
    getDashboardStats(),
  ]);

  const STATS = [
    { label: "Total Trainees",   value: stats.totalTrainees,  icon: faUsers,    color: "violet" },
    { label: "Active Workouts",  value: stats.activeWorkouts, icon: faDumbbell, color: "purple" },
    { label: "Workouts Today",   value: stats.workoutsToday,  icon: faChartBar, color: "indigo" },
  ] as const;

  return (
    <main>
      <div className="flex justify-between items-center  mb-3">
        <h1 className="text-xl md:text-2xl justify-self-start dark:text-violet-200">
          Welcome, {userData?.name} 👋
        </h1>

        {userData?.role === "trainer" ? (
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/create-trainee"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-violet-200 dark:shadow-violet-800 transition-all active:scale-95"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              Create Trainee
            </Link>
            <Link
              href="/dashboard/create-workout"
              className="flex items-center gap-2 bg-white dark:bg-indigo-950/50 dark:hover:border-gray-800 dark:hover:bg-indigo-900/50 hover:bg-gray-50 text-gray-700 dark:text-violet-100 border border-gray-200 dark:border-gray-800 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-4 h-4 text-violet-600"
              />
              Create Workout
            </Link>
          </div>
        ) : null}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {STATS.map((s, i) => (
          <StatCard key={i} stat={s} delay={i} />
        ))}
      </div>

      <Schedule />
    </main>
  );
}
