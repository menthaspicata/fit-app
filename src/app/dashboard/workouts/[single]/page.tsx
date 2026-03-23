import { getWorkoutById, getWorkoutExercises } from '@/lib/actions/workout';
import { BackButton } from '@/components/ui/back-button';
import Link from 'next/link';
import { Metadata } from 'next';
import { fmtDate, fmtTime, initials } from '@/features/helpers';
import { DeleteWorkoutButton } from '@/features/workouts/workout-remove';
import { RunWorkoutButton } from '@/features/workouts/workout-run-button';
import { WorkoutStatusSelect } from '@/features/workouts/workout-status-select';
import { MUSCLE_COLORS } from '@/features/helpers'


export const metadata: Metadata = {
  title: 'Workout',
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function Page({
  params,
}: {
  params: Promise<{ single: string }>;
}) {
  const { single } = await params;
  return <Content single={single} />;
}

async function Content({ single }: { single: string }) {
  const workout   = await getWorkoutById(single);
  const exercises = await getWorkoutExercises(single);

  if (!workout) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center justify-center text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 5v14M18 5v14M6 12h12M3 7h3M3 17h3M18 7h3M18 17h3" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-400">Workout not found</p>
          <Link href="/dashboard/workouts" className="text-xs text-violet-600 hover:underline mt-2 block">
            ← Back to workouts
          </Link>
        </div>
      </div>
    );
  }

  const assignedTo  = workout.userWorkouts[0]?.user;
  const totalSets   = exercises.reduce((acc, ex) => acc + (ex.sets?.length ?? 0), 0);
  const totalVolume = exercises.reduce((acc, ex) =>
    acc + (ex.sets?.reduce((s, set) => s + set.reps * set.weight, 0) ?? 0), 0
  );

  return (
    <div className="max-w-3xl mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <BackButton />
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Workout Detail</p>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight truncate mt-0.5">
            {workout.name}
          </h1>
        </div>
        <Link
          href={`/dashboard/workouts/${single}/edit`}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-violet-300 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="hidden sm:inline">Edit</span>
        </Link>
        <RunWorkoutButton workoutId={single} />
        <DeleteWorkoutButton workoutId={single} workoutName={workout.name} />
      </div>

      {/* ── Info card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
        <div className="px-5 sm:px-6 py-4 border-b border-gray-50">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Details</h2>
        </div>

        <div className="px-5 sm:px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Assigned to */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Assigned To</p>
              {assignedTo ? (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-[8px] font-bold">
                    {initials(assignedTo.name)}
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{assignedTo.name}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 mt-0.5">Unassigned</p>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Scheduled</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">{fmtDate(workout.date)}</p>
              {fmtTime(workout.date) && (
                <p className="text-xs text-gray-400">{fmtTime(workout.date)}</p>
              )}
            </div>
          </div>

          <WorkoutStatusSelect
            workoutId={single}
            currentStatus={(assignedTo ? (workout.userWorkouts[0]?.status as any) : 'assigned') ?? 'assigned'}
          />

          {/* Notes — full width if present */}
          {workout.notes && (
            <div className="sm:col-span-2 flex items-start gap-3">
              <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Notes</p>
                <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{workout.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-50">
          {[
            { label: 'Exercises', value: exercises.length },
            { label: 'Total Sets', value: totalSets },
            { label: 'Volume', value: totalVolume > 0 ? `${totalVolume.toLocaleString()} kg` : '—' },
          ].map((s) => (
            <div key={s.label} className="px-4 py-3 text-center">
              <p className="text-base font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Exercises ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Exercises</h2>
          <span className="text-xs text-gray-400">{exercises.length} exercise{exercises.length !== 1 ? 's' : ''}</span>
        </div>

        {exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 5v14M18 5v14M6 12h12M3 7h3M3 17h3M18 7h3M18 17h3" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">No exercises in this workout</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {exercises.map((ex, exIdx) => {
              const colors = MUSCLE_COLORS[ex.exercise?.muscleGroup ?? ''];
              const exVolume = ex.sets?.reduce((s, set) => s + set.reps * set.weight, 0) ?? 0;

              return (
                <div key={ex.id} className="px-5 sm:px-6 py-4">
                  {/* Exercise header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-gray-400">{exIdx + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-gray-800">{ex.exercise?.name ?? 'Unknown exercise'}</p>
                      {ex.exercise?.muscleGroup && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors?.pill ?? 'bg-gray-100 text-gray-500 border-gray-100'}`}>
                          {ex.exercise.muscleGroup}
                        </span>
                      )}
                    </div>
                    {exVolume > 0 && (
                      <span className="text-xs text-gray-400 flex-shrink-0">{exVolume.toLocaleString()} kg</span>
                    )}
                  </div>

                  {/* Sets table */}
                  {ex.sets && ex.sets.length > 0 && (
                    <div className="ml-10">
                      {/* Column headers */}
                      <div className="grid grid-cols-3 mb-1.5">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Set</span>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide text-center">Reps</span>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide text-center">Weight</span>
                      </div>

                      {/* Set rows */}
                      <div className="space-y-1.5">
                        {ex.sets.map((set) => (
                          <div key={set.id} className="grid grid-cols-3 items-center bg-gray-50 rounded-xl px-3 py-2">
                            <span className="text-xs font-semibold text-gray-500">#{set.set_number}</span>
                            <div className="text-center">
                              <span className="text-sm font-bold text-gray-800">{set.reps}</span>
                              <span className="text-[10px] text-gray-400 ml-1">reps</span>
                            </div>
                            <div className="text-center">
                              <span className="text-sm font-bold text-gray-800">{set.weight}</span>
                              <span className="text-[10px] text-gray-400 ml-1">kg</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Per-exercise total */}
                      {ex.sets.length > 1 && (
                        <div className="grid grid-cols-3 mt-2 px-3">
                          <span className="text-[10px] text-gray-400">Total</span>
                          <span className="text-[10px] font-semibold text-gray-500 text-center">
                            {ex.sets.reduce((s, set) => s + set.reps, 0)} reps
                          </span>
                          <span className="text-[10px] font-semibold text-gray-500 text-center">
                            {exVolume.toLocaleString()} kg
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
