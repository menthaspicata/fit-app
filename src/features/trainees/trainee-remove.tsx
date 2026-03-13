'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { removeTrainee } from '@/lib/actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';

interface RemoveTraineeButtonProps {
  traineeId: string;
  traineeName: string;
}

export function RemoveTraineeButton({ traineeId, traineeName }: RemoveTraineeButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleRemove() {
    setError(null);
    startTransition(async () => {
      const result = await removeTrainee(traineeId);
      if (result.success) {
        router.push('/dashboard/trainees');
      } else {
        setError(result.message);
        setShowConfirm(false);
      }
    });
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 md:ml-auto">
        {error && <p className="text-xs text-red-400">{error}</p>}
        <span className="text-xs text-slate-400 hidden sm:block">Remove <span className="text-slate-700 font-medium">{traineeName}</span>?</span>
        <button
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
          className="cursor-pointer text-xs px-3 py-1.5 rounded-lg border border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleRemove}
          disabled={isPending}
          className="cursor-pointer text-xs px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:border-red-500/60 hover:text-red-300 transition-all disabled:opacity-50 flex items-center gap-1.5"
        >
          {isPending ? (
            <>
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Removing…
            </>
          ) : (
            'Confirm Remove'
          )}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="cursor-pointer md:ml-auto p-2 rounded-xl border border-slate-700 text-slate-500 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
      title="Remove trainee"
    >
      <FontAwesomeIcon icon={faUserXmark} />
    </button>
  );
}