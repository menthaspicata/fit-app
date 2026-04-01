'use client';

import { Dispatch, SetStateAction } from 'react';

interface FinishBarProps {
  allDone: boolean;
  doneSets: number;
  totalSets: number;
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
}

export function FinishBar({ allDone, doneSets, totalSets, setShowConfirm }: FinishBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-6 pt-3 bg-gradient-to-t from-gray-50 via-gray-50/95 dark:from-slate-950 dark:via-slate-950/95 dark:to-transparent pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        <button
          onClick={() => setShowConfirm(true)}
          className={`w-full cursor-pointer flex items-center justify-center gap-2.5 font-bold text-sm py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] ${
            allDone
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-gray-900 hover:bg-gray-800 dark:bg-purple-800 dark:hover:border-gray-800 dark:hover:bg-indigo-900/20 text-white'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          {allDone ? 'All done — Finish Workout' : `Finish Workout (${doneSets}/${totalSets} sets)`}
        </button>
      </div>
    </div>
  );
}