'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteWorkout } from '@/lib/actions/workout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface DeleteWorkoutButtonProps {
  workoutId: string;
  workoutName: string;
}

export function DeleteWorkoutButton({ workoutId, workoutName }: DeleteWorkoutButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await deleteWorkout(workoutId);
      if (result.success) {
        router.push('/dashboard/workouts');
      } else {
        setError(result.message);
        setShowConfirm(false);
      }
    });
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        {error && <p className="text-xs text-red-500">{error}</p>}
        <span className="text-xs text-gray-400 hidden sm:block">
          Delete <span className="text-gray-600 font-medium">{workoutName}</span>?
        </span>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
          className="cursor-pointer text-xs px-3 py-2 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="cursor-pointer text-xs px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-400 text-red-500 hover:text-red-600 transition-all disabled:opacity-50 flex items-center gap-1.5 font-semibold"
        >
          {isPending ? (
            <>
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Deleting…
            </>
          ) : (
            'Confirm Delete'
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="cursor-pointer flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-400 text-red-500 hover:text-red-600 text-sm font-semibold px-3 py-2.5 rounded-xl shadow-sm transition-all"
      title="Delete workout"
    >
      <FontAwesomeIcon icon={faTrashCan} />
      <span className="hidden sm:inline">Delete</span>
    </button>
  );
}