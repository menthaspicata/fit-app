'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { WorkoutData  } from '@/features/workouts/workout-run-page';
import { fmtDuration } from '@/features/helpers';

interface WorkoutHeaderProps {
  workout: WorkoutData;
  allDone: boolean;
  progress: number;
  paused: boolean;
  doneSets: number;
  totalSets: number;
  setPaused: Dispatch<SetStateAction<boolean>>;
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
  onElapsedChange: (elapsed: number) => void;
}

export function WorkoutHeader({
  workout,
  allDone,
  progress,
  paused,
  doneSets,
  totalSets,
  setPaused,
  setShowConfirm,
  onElapsedChange,
}: WorkoutHeaderProps) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onElapsedChangeRef = useRef(onElapsedChange);
  useEffect(() => { onElapsedChangeRef.current = onElapsedChange; }, [onElapsedChange]);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        elapsedRef.current += 1;
        setElapsed(elapsedRef.current);
        onElapsedChangeRef.current(elapsedRef.current);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  return (
    <div className=" pt-4 pb-3 px-4 sm:px-6  mb-5">
      <div className="flex items-center gap-3">

        {/* Timer + pause */}
        <div className="flex-1">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{workout.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-2xl font-bold text-gray-900 dark:text-violet-200 tabular-nums tracking-tight font-mono">
              {fmtDuration(elapsed)}
            </span>
            <button
              onClick={() => setPaused((p) => !p)}
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              {paused ? (
                <svg className="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Progress ring */}
        <div className="relative w-12 h-12 flex-shrink-0">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#f3f4f6" strokeWidth="4" />
            <circle
              cx="24" cy="24" r="20" fill="none"
              stroke={allDone ? '#10b981' : '#7c3aed'}
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.4s ease' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700 dark:text-violet-100">
            {doneSets}/{totalSets}
          </span>
        </div>

        {/* Finish button */}
        <button
          onClick={() => setShowConfirm(true)}
          className={`flex items-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all ${
            allDone
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200'
              : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-700'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="hidden sm:inline">Finish</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${allDone ? 'bg-emerald-400' : 'bg-violet-500'}`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}