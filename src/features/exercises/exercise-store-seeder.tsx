'use client';

import { useEffect } from 'react';
import { useTrainingStore } from '@/store/store';

type SeedExercise = {
  exerciseId: string;
  sets: { reps: number; weight: number }[];
};

export function ExerciseStoreSeeder({ exercises }: { exercises: SeedExercise[] }) {
  useEffect(() => {
    const store = useTrainingStore.getState();
    store.clearExercises?.();
    exercises.forEach((ex) => {
      store.seedExercise(ex.exerciseId, ex.sets);
    });
  }, []);

  return null;
}