'use client';

import { WorkoutSetDTO } from '@/types/types';
import { ExerciseData  } from '@/features/workouts/workout-run-page';

import { MUSCLE_COLORS } from '@/features/helpers'

interface ExerciseCardProps {
  ex: ExerciseData;
  exIdx: number;
  isActive: boolean;
  completedSetIds: Set<string>;
  nextExerciseName?: string;
  onToggleExpand: () => void;
  onToggleSet: (setId: string) => void;
  onStartRest: (seconds: number) => void;
  onNextExercise: () => void;
}

export function ExerciseCard({
  ex,
  exIdx,
  isActive,
  completedSetIds,
  nextExerciseName,
  onToggleExpand,
  onToggleSet,
  onStartRest,
  onNextExercise,
}: ExerciseCardProps) {
  const colors    = MUSCLE_COLORS[ex.exercise?.muscleGroup ?? ''];
  const exSets    = ex.sets ?? [];
  const doneCount = completedSetIds.size;
  const allExDone = doneCount === exSets.length && exSets.length > 0;

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all dark:bg-slate-900 dark:border-gray-800 ${
      isActive ? 'border-violet-200 ' : allExDone ? 'border-emerald-100' : 'border-gray-100 dark:border-gray-800'
    }`}>

      {/* ── Header row (tap to expand/collapse) ── */}
      <button
        onClick={onToggleExpand}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
      >
        {/* Index / checkmark */}
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
          allExDone ? 'bg-emerald-100' : isActive ? 'bg-violet-100' : 'bg-gray-100'
        }`}>
          {allExDone ? (
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className={`text-[11px] font-bold ${isActive ? 'text-violet-500' : 'text-gray-400'}`}>
              {exIdx + 1}
            </span>
          )}
        </div>

        {/* Name + muscle group */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className={`text-sm font-bold ${allExDone ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-purple-200'}`}>
              {ex.exercise?.name ?? 'Unknown exercise'}
            </p>
            {ex.exercise?.muscleGroup && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors?.pill ?? 'bg-gray-100 text-gray-500'}`}>
                {ex.exercise.muscleGroup}
              </span>
            )}
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">{doneCount}/{exSets.length} sets completed</p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {exSets.map((set) => (
            <div
              key={set.id}
              className={`w-2 h-2 rounded-full transition-colors ${
                completedSetIds.has(set.id)
                  ? allExDone ? 'bg-emerald-400' : 'bg-violet-500'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-300 flex-shrink-0 transition-transform ${isActive ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ── Expanded: sets table ── */}
      {isActive && exSets.length > 0 && (
        <div className="border-t border-gray-50 dark:border-slate-600 px-5 pb-4">

          {/* Column headers */}
          <div className="grid grid-cols-4 py-2.5 ml-11">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Set</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide text-center">Reps</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide text-center">Weight</span>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide text-center">Done</span>
          </div>

          {/* Set rows */}
          <div className="space-y-2">
            {exSets.map((set) => (
              <SetRow
                key={set.id}
                set={set}
                isDone={completedSetIds.has(set.id)}
                onToggle={() => onToggleSet(set.id)}
              />
            ))}
          </div>

          {/* Rest quick-buttons */}
          <div className="flex items-center gap-2 mt-3 ml-8">
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mr-1">Rest:</span>
            {[60, 90, 120, 180].map((s) => (
              <button
                key={s}
                onClick={() => onStartRest(s)}
                className="text-[10px] font-semibold text-gray-500 hover:text-violet-600 bg-gray-100 hover:bg-violet-50 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                {s / 60}m
              </button>
            ))}
          </div>

          {/* Auto-advance to next exercise */}
          {allExDone && nextExerciseName && (
            <button
              onClick={onNextExercise}
              className="mt-3 ml-8 flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:text-violet-700"
            >
              Next: {nextExerciseName}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── SetRow ────────────────────────────────────────────────────────────────────
function SetRow({ set, isDone, onToggle }: { set: WorkoutSetDTO; isDone: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-full grid grid-cols-4 items-center rounded-xl px-3 py-2.5 ml-8 transition-all active:scale-[0.98] ${
        isDone
          ? 'bg-emerald-50 border border-emerald-100'
          : 'bg-gray-50 dark:bg-slate-800  border border-transparent hover:border-violet-100 dark:hover:border-slate-800 dark:hover:bg-gray-50/10 hover:bg-violet-50/40'
      }`}
      style={{ width: 'calc(100% - 2rem)' }}
    >
      <span className={`text-xs font-semibold ${isDone ? 'text-emerald-500' : 'text-gray-500'}`}>
        #{set.set_number}
      </span>
      <div className="text-center">
        <span className={`text-sm font-bold ${isDone ? 'text-emerald-700' : 'text-gray-800 dark:text-violet-100'}`}>{set.reps}</span>
        <span className="text-[10px] text-gray-400 ml-1">reps</span>
      </div>
      <div className="text-center">
        <span className={`text-sm font-bold ${isDone ? 'text-emerald-700' : 'text-gray-800 dark:text-violet-100'}`}>{set.weight}</span>
        <span className="text-[10px] text-gray-400 ml-1">kg</span>
      </div>
      <div className="flex justify-center">
        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
          isDone ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 bg-white'
        }`}>
          {isDone && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}