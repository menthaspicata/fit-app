'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { WorkoutDTO, ExerciseDTO, WorkoutExerciseDTO, WorkoutSetDTO  } from '@/types/types';
import { WorkoutPreview }   from '@/features/workouts/workout-prerun';
import { WorkoutHeader }    from '@/features/workouts/in-progress/header';
import { RestTimerBanner }  from '@/features/workouts/in-progress/rest-timer';
import { ExerciseCard }     from '@/features/workouts/in-progress/exercise-card';
import { FinishBar }        from '@/features/workouts/in-progress/finish-button';
import { FinishModal }      from '@/features/workouts/in-progress/finish-modal';

export type ExerciseData = WorkoutExerciseDTO & {
  exercise: ExerciseDTO | null;
  sets: WorkoutSetDTO[];
};
 
export type WorkoutData = WorkoutDTO & {
  userWorkouts: {
    status: string | null;
    user: { id: string; name: string } | null;
  }[];
};

interface WorkoutInProgressProps {
  workoutId: string;
  workout: WorkoutData;
  exercises: ExerciseData[];
  onComplete?: (completedSetIds: string[]) => Promise<void>;
}

export function WorkoutInProgress({ workoutId, workout, exercises, onComplete }: WorkoutInProgressProps) {
  const router = useRouter();

  // Workout state
  const [started, setStarted]           = useState(false);
  const [paused, setPaused]             = useState(false);
  const [elapsed, setElapsed]           = useState(0);
  const [activeExIdx, setActiveExIdx]   = useState(0);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [saving, setSaving]             = useState(false);

  // { exerciseId -> Set<setId> }
  const [completedSets, setCompletedSets] = useState<Record<string, Set<string>>>(() =>
    Object.fromEntries(exercises.map((ex) => [ex.id, new Set<string>()]))
  );

  // Rest timer
  const [restSeconds, setRestSeconds]   = useState(0);
  const [restActive, setRestActive]     = useState(false);
  const restIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => { if (restIntervalRef.current) clearInterval(restIntervalRef.current); };
  }, []);
  

  const startRest = useCallback((secs: number) => {
    if (restIntervalRef.current) clearInterval(restIntervalRef.current);
    setRestSeconds(secs);
    setRestActive(true);
    restIntervalRef.current = setInterval(() => {
      setRestSeconds((prev) => {
        if (prev <= 1) { clearInterval(restIntervalRef.current!); setRestActive(false); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stopRest = useCallback(() => {
    if (restIntervalRef.current) clearInterval(restIntervalRef.current);
    setRestActive(false);
    setRestSeconds(0);
  }, []);

  // Set toggle
  const toggleSet = useCallback((exId: string, setId: string) => {
    setCompletedSets((prev) => {
      const next = { ...prev, [exId]: new Set(prev[exId]) };
      if (next[exId].has(setId)) {
        next[exId].delete(setId);
      } else {
        next[exId].add(setId);
        startRest(90); // auto-start rest after completing a set
      }
      return next;
    });
  }, [startRest]);

  // Derived stats 
  const totalSets = exercises.reduce((a, ex) => a + (ex.sets?.length ?? 0), 0);
  const doneSets  = Object.values(completedSets).reduce((a, s) => a + s.size, 0);
  const progress  = totalSets > 0 ? doneSets / totalSets : 0;
  const allDone   = doneSets === totalSets && totalSets > 0;

  // Finish
  const handleFinish = async () => {
    setSaving(true);
    const completedSetIds = Object.values(completedSets).flatMap((s) => [...s]);
    try {
      await onComplete?.(completedSetIds);
      router.push(`/dashboard/workouts/${workoutId}`);
    } catch {
      setSaving(false);
    }
  };

  // Pre-start screen
  if (!started) {
    return (
      <WorkoutPreview
        workout={workout}
        exercises={exercises}
        totalSets={totalSets}
        onStart={() => setStarted(true)}
      />
    );
  }

  // In-progress screen
  return (
    <div className="max-w-3xl mx-auto pb-32 relative">

      <WorkoutHeader
        workout={workout}
        allDone={allDone}
        progress={progress}
        paused={paused}
        doneSets={doneSets}
        totalSets={totalSets}
        setPaused={setPaused}
        setShowConfirm={setShowConfirm}
        onElapsedChange={setElapsed}
      />

      {restActive && (
        <RestTimerBanner restSeconds={restSeconds} onSkip={stopRest} />
      )}

      <div className="space-y-3">
        {exercises.map((ex, exIdx) => (
          <ExerciseCard
            key={ex.id}
            ex={ex}
            exIdx={exIdx}
            isActive={activeExIdx === exIdx}
            completedSetIds={completedSets[ex.id] ?? new Set()}
            nextExerciseName={exercises[exIdx + 1]?.exercise?.name ?? undefined}
            onToggleExpand={() => setActiveExIdx(activeExIdx === exIdx ? -1 : exIdx)}
            onToggleSet={(setId) => toggleSet(ex.id, setId)}
            onStartRest={startRest}
            onNextExercise={() => setActiveExIdx(exIdx + 1)}
          />
        ))}
      </div>

      <FinishBar
        allDone={allDone}
        doneSets={doneSets}
        totalSets={totalSets}
        setShowConfirm={setShowConfirm}
      />

      {showConfirm && (
        <FinishModal
          allDone={allDone}
          doneSets={doneSets}
          totalSets={totalSets}
          elapsed={elapsed}
          saving={saving}
          exercises={exercises}
          completedSets={completedSets}
          onConfirm={handleFinish}
          setShowConfirm={setShowConfirm}
        />
      )}
    </div>
  );
}