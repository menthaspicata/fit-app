'use client';

import { Dispatch, SetStateAction } from 'react';
import { ExerciseData  } from '@/features/workouts/workout-run-page';
import { fmtDuration } from '@/features/helpers';

interface FinishModalProps {
  allDone: boolean;
  doneSets: number;
  totalSets: number;
  elapsed: number;
  saving: boolean;
  exercises: ExerciseData[];
  completedSets: Record<string, Set<string>>;
  onConfirm: () => void;
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
}

export function FinishModal({
  allDone,
  doneSets,
  totalSets,
  elapsed,
  saving,
  exercises,
  completedSets,
  onConfirm,
  setShowConfirm,
}: FinishModalProps) {
  const exercisesDoneCount = exercises.filter(
    (ex) => (completedSets[ex.id]?.size ?? 0) > 0
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setShowConfirm(false)}
      />

      <div className="relative bg-white dark:bg-slate-900 dark:border-gray-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="px-6 pt-6 pb-2">

          {/* Icon */}
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${allDone ? 'bg-emerald-100' : 'bg-amber-100'}`}>
            {allDone ? (
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>

          <h3 className="text-base font-bold text-gray-900 dark:text-violet-100 text-center">
            {allDone ? 'Great work! 💪' : 'Finish early?'}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 text-center mt-1.5 mb-4">
            {allDone
              ? `You completed all ${totalSets} sets in ${fmtDuration(elapsed)}.`
              : `You've completed ${doneSets} of ${totalSets} sets. Finish anyway?`}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { label: 'Sets Done',  value: `${doneSets}/${totalSets}` },
              { label: 'Duration',   value: fmtDuration(elapsed) },
              { label: 'Exercises',  value: `${exercisesDoneCount}/${exercises.length}` },
            ].map((s) => (
              <div key={s.label} className="text-center bg-gray-50 dark:bg-slate-800 rounded-xl py-2.5">
                <p className="text-sm font-bold text-gray-800 dark:text-purple-200">{s.value}</p>
                <p className="text-[9px] text-gray-400 dark:text-gray-300 uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => setShowConfirm(false)}
            className="py-4 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer dark:hover:border-gray-800 dark:hover:bg-indigo-900/20"
          >
            Keep Going
          </button>
          <button
            onClick={onConfirm}
            disabled={saving}
            className="cursor-pointer py-4 text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-60 transition-colors"
          >
            {saving ? 'Saving…' : 'Save & Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}