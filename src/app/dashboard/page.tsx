
import Button from '@/components/ui/button';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { fetchUserData } from '@/lib/actions/user';
import Schedule from '@/features/schedule/schedule';

export const metadata: Metadata = {
  title: 'Dashboard',
};
 
export default async function Page() {
  const userData = await fetchUserData();
  return (
    <main>
        <h1 className="text-xl md:text-2xl justify-self-start mb-3">
          Welcome, {userData?.name}
        </h1>

      {userData?.role === 'trainer' ?      
      <div className='flex justify-between mb-3'>
         <Button className="w-auto cursor-pointer justify-self-end " > 
            <Link href="/dashboard/create-trainee">Create Trainee+</Link>
            
          </Button>
        <Button className="w-auto cursor-pointer justify-self-end" > 
            <Link href="/dashboard/create-workout">Create Workout+</Link>
        </Button>
      </div>
      : null}

      
      <Schedule />
    </main>
  );
}