import { CreateWorkoutForm } from "@/components/forms/create-workout-form";
import { Metadata } from "next";
import { BackButton } from "@/components/ui/back-button";
import { ExerciseList } from "@/features/exercises/exercises-list";
import { ExerciseBuilder } from "@/features/exercises/exercises-builder";
import { getAllExercises } from "@/lib/actions/exercise";
import { getAllTrainees } from "@/lib/actions/user";

export const metadata: Metadata = {
  title: "Create Workout",
};

export default async function Page() {
  const exercises = await getAllExercises();
  const trainees = await getAllTrainees();

  return (
    <>
      <div className="flex items-center mb-6">
        <BackButton />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Create Workout
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5 hidden sm:block">
            Build and assign a workout to a trainee
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4 ">
        <CreateWorkoutForm trainees={trainees} />
        <ExerciseList allExercises={exercises} />
        <ExerciseBuilder allExercises={exercises} />
      </div>
    </>
  );
}
