import { getWorkoutById, getWorkoutExercises } from '@/lib/actions/workout';
import { getAllExercises } from '@/lib/actions/exercise';
import { BackButton } from '@/components/ui/back-button';
import { CreateWorkoutForm } from '@/components/forms/create-workout-form';
import { ExerciseList } from '@/features/exercises/exercises-list';
import { ExerciseBuilder } from '@/features/exercises/exercises-builder';
import { getAllTrainees } from '@/lib/actions/user';
import { ExerciseStoreSeeder } from '@/features/exercises/exercise-store-seeder'; 

export default async function EditPage({ params }: { params: Promise<{ single: string }> }) {
  const { single } = await params;
  const [workout, trainees, workoutExercises, exercises] = await Promise.all([
    getWorkoutById(single),
    getAllTrainees(),
    getWorkoutExercises(single),
    getAllExercises(),
  ]);

  if (!workout) return <div>Workout not found.</div>;

  const seedExercises = workoutExercises.map((ex) => ({
    exerciseId: ex.exerciseId,
    sets: ex.sets?.map((s) => ({ reps: s.reps, weight: s.weight })) ?? [],
  }));

  return (
        <>
          <ExerciseStoreSeeder exercises={seedExercises} /> 
          <div className="flex items-center mb-6">
            <BackButton />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Edit Workout
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5 hidden sm:block">
                Build and assign a workout to a trainee
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 ">
            <CreateWorkoutForm
              trainees={trainees}
              workout={{
                id: workout.id,
                name: workout.name,
                date: workout.date,
                notes: workout.notes,
                userId: workout.userWorkouts?.[0]?.user?.id ?? null,
                createdAt: workout.createdAt
              }}
            />
            <ExerciseList allExercises={exercises} />
            <ExerciseBuilder allExercises={exercises} />
          </div>
        </>
  );
}