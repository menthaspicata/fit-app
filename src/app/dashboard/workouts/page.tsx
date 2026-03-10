import { BackButton } from '@/components/ui/back-button';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllWorkouts } from '@/lib/actions/workout';

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

      <div className="grid gap-4 bg-white  rounded-lg p-6 shadow">
           {allWorkouts.map((workout) => {
            const assignedTo = workout.userWorkouts[0]?.user;

           return (
             <Link key={workout.id} href={`/dashboard/workouts/${workout.id}`}>
            <div key={workout.id} className="grid grid-flow-col-dense justify-between items-center" >
              <p>{workout.name}</p>
              <p className="text-sm text-gray-500">
                {assignedTo ? `👤 ${assignedTo.name}` : 'Unassigned'}
              </p>
              <p>{workout.date?.toLocaleString()}</p>
              {/* <Button className="w-full cursor-pointer" > 
                Create Workout
            </Button> */}
            </div>
            </Link>)
          })}
      </div>
    </>
  );
}