'use client';

import { BackButton } from '@/components/ui/back-button';
import { ExerciseData, WorkoutData  } from '@/features/workouts/workout-run-page';
import { MUSCLE_COLORS } from '@/features/helpers';

interface WorkoutPreviewProps {
  workout: WorkoutData;
  exercises: ExerciseData[];
  totalSets: number;
  onStart: () => void;
}

export function WorkoutPreview({ workout, exercises, totalSets, onStart }: WorkoutPreviewProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <BackButton href={`/dashboard/workouts/${workout.id}`} />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Ready to Train</p>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight truncate mt-0.5">
            {workout.name}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
        <div className="px-6 py-5">

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Exercises', value: exercises.length },
              { label: 'Total Sets', value: totalSets },
              { label: 'Est. Time', value: `~${Math.max(20, totalSets * 2)}m` },
            ].map((s) => (
              <div key={s.label} className="text-center bg-gray-50 rounded-xl py-3">
                <p className="text-lg font-bold text-gray-900">{s.value}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Exercise list */}
          <div className="space-y-2 mb-6">
            {exercises.map((ex, i) => {
              const colors = MUSCLE_COLORS[ex.exercise?.muscleGroup ?? ''];
              return (
                <div key={ex.id} className="flex items-center gap-3 py-2">
                  <span className="text-xs font-bold text-gray-300 w-5 text-right">{i + 1}</span>
                  <div className="flex-1 flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-700">
                      {ex.exercise?.name ?? 'Unknown'}
                    </span>
                    {ex.exercise?.muscleGroup && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors?.pill ?? 'bg-gray-100 text-gray-500'}`}>
                        {ex.exercise.muscleGroup}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{ex.sets?.length ?? 0} sets</span>
                </div>
              );
            })}
          </div>

          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2.5 bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white font-bold text-sm py-3.5 rounded-xl shadow-md shadow-violet-200 transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start Workout
          </button>
        </div>
      </div>
    </div>
  );
}