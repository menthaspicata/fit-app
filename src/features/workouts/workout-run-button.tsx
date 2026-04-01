import Link from 'next/link';

interface RunWorkoutButtonProps {
  workoutId: string;
}

export function RunWorkoutButton({ workoutId }: RunWorkoutButtonProps) {
    return (
        <Link
            href={`/dashboard/workouts/${workoutId}/run`}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-violet-200 dark:shadow-purple-700 transition-all"
            >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
            </svg>
            <span className="hidden sm:inline">Start</span>
        </Link>
    )
}