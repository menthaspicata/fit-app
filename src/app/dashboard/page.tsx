
import Button from '@/components/ui/button';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { fetchUserData } from '@/lib/actions/users.actions';
import Schedule from '@/features/schedule/schedule';

export const metadata: Metadata = {
  title: 'Dashboard',
};
 
export default async function Page() {
  const userData = await fetchUserData();
  return (
    <main>
        <h1 className="text-xl md:text-2xl justify-self-start mb-10">
          Welcome, {userData?.name}
        </h1>

      {userData?.role === 'trainer' ?      
      <div className='flex justify-between mb-10'>
         <Button className="w-auto cursor-pointer justify-self-end " > 
            <Link href="/dashboard/create-trainee">Create Trainee+</Link>
            
          </Button>
        <Button className="w-auto cursor-pointer justify-self-end" > 
            <Link href="/dashboard/create-workout">Create Workout+</Link>
        </Button>
      </div>
      : null}

      
      <Schedule />
      {/* <div className="card mb-10">
      
        <h2 className="mt-4 mb-4 text-xl md:text-2xl"><Link href={`/dashboard/workouts`}>Workouts</Link></h2>
        <div className="grid gap-4">
           {allWorkouts.map((workout) => (
            <Link href={`/dashboard/workouts/${workout.id}`} key={workout.id}>
            <div key={workout.id} className="grid pb-4 grid-flow-col-dense justify-between items-center" >
              <p>{workout.name}</p>
              <p>{workout.date?.toLocaleString()}</p>
            </div>
            </Link>
          ))}
        </div>
      </div> */}

      {/* <div className="card mb-10">
        <h1 className="mt-4 mb-4 text-xl md:text-2xl">All Trainees</h1>
        <div className="grid gap-4">
           {allTrainees.map((trainee) => (
            <div key={trainee.id} className="grid pb-4 grid-flow-col-dense justify-between items-center" >
              <p>{trainee.name}</p>
              <p>{trainee.email}</p>
              <Button className="w-full cursor-pointer" > 
                <Link href="/dashboard/create-workout">Create Workout</Link>
              </Button>
            </div>
          ))}
        </div>
      </div> */}


    </main>
  );
}