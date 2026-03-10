import { CreateWorkoutForm } from '@/components/forms/create-workout-form';
import { Metadata } from 'next';
import { BackButton } from '@/components/ui/back-button';
import { Search } from '@/components/ui/search';
import { ExerciseList } from '@/features/exercises/exercises-list';
import { getAllExercises } from '@/lib/actions/exercise';
import { getAllTrainees } from '@/lib/actions/user';


export const metadata: Metadata = {
  title: 'Create Workout',
};

export default async function Page() {
  const exercises = await getAllExercises();
  const trainees = await getAllTrainees();
  

  return (
    <>
      <div className='grid grid-cols-3 justify-between items-center text-center mb-6'>
        <BackButton />
        <h1>Create Workout</h1>
      </div>
      <CreateWorkoutForm trainees={trainees} />
      <div>
        <h1 className="mt-8 mb-2 text-xl md:text-2xl">Exercises</h1>
        <Search placeholder="Search Exercise"/>
        <ExerciseList list={ exercises }/>
        <div className="grid gap-4">
        </div>
      </div>
    </>
  )
}