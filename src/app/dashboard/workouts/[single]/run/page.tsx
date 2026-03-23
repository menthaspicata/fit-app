import { getWorkoutById, getWorkoutExercises, completeWorkout } from '@/lib/actions/workout';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { WorkoutInProgress } from '@/features/workouts/workout-run-page'

export const metadata: Metadata = { title: 'Workout in Progress' };

export default async function Page({
  params,
}: {
  params: Promise<{ single: string }>;
}) {
  const { single } = await params;
  const [workout, exercises] = await Promise.all([
    getWorkoutById(single),
    getWorkoutExercises(single),
  ]);


  if (!workout) redirect('/dashboard/workouts');

  async function handleComplete(_completedSetIds: string[]) {
    'use server';
    await completeWorkout(single, workout?.userWorkouts[0].userId ?? '');
  }

  return (
      <WorkoutInProgress
        workoutId={single}
        workout={workout}
        exercises={exercises}
        onComplete={handleComplete}
      />
  );
}