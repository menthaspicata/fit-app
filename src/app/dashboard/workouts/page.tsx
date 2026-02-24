import { BackButton } from '@/app/ui/back-button';
import Button from '@/app/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllWorkouts } from '@/app/lib/actions/workouts.actions';

export const metadata: Metadata = {
  title: 'Workouts',
};

export default async function WorkoutPage() {
  const allWorkouts = await getAllWorkouts();
    
  return (
    <>
      <div className='grid grid-cols-3 justify-between items-center text-center mb-6'>
        <BackButton />
        <h1>Workouts</h1>
      </div>  

      <div className="grid gap-4">
           {allWorkouts.map((workout) => (
            <Link key={workout.id} href={`/dashboard/workouts/${workout.id}`}>
            <div key={workout.id} className="grid pb-4 grid-flow-col-dense justify-between items-center" >
              <p>{workout.name}</p>
              
              <p>{workout.date?.toLocaleString()}</p>
              {/* <Button className="w-full cursor-pointer" > 
                Create Workout
            </Button> */}
            </div>
            </Link>
          ))}
      </div>
    </>
  );
}