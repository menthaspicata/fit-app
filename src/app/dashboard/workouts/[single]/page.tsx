import { getWorkoutById, getWorkoutExercises } from '@/lib/actions';
import { BackButton } from '@//components/ui/back-button';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workout',
};

export default async function Page({
  params,
}: {
  params: Promise<{ single: string }>
}) {
  const { single } = await params;
  return <div>
    <Content single={single} />
  </div>
}

async function Content({ single }: { single: string }) {
  const workout = await getWorkoutById(single)
  const exercises = await getWorkoutExercises(single)

  return (workout && exercises) && (
    <>
    <div className='grid grid-cols-3 justify-between items-center text-center mb-6'>
      <BackButton />
      <h1>Workout</h1>
      <Button>
        <Link href="/dashboard/workout/${single}/edit">Edit</Link>
      </Button>
    </div>

      <h2>
        Workout Name:
        {workout.name}</h2>
        {workout.notes &&  <p> Notes: {workout?.notes}</p>}
      <p>
        Date:
        {workout?.date?.toDateString()}</p>
      
        Execises 
      <ul>
        {exercises?.map((exercise) => (
          <li key={exercise.id} className='exercise-card mb-4 grid border-s-4 border-gray-300 p-4  justify-between items-center cursor-pointer'>
            <h3>{exercise.exercise?.name}</h3>
            <p className='text-sm'>{exercise.exercise?.muscleGroup}</p>

            <p>Sets:</p>
            <ul>
              {exercise.sets?.map((set) => (
                <li key={set.id}>
                  <p>Sets: {set.set_number}</p>
                  <p>Reps: {set.reps}</p>
                  <p>Weight: {set.weight}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
        
      
    </>
  )
}