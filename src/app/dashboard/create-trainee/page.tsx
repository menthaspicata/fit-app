import { BackButton } from '@/app/ui/back-button';
import { CreateTraineeForm } from '@/app/ui/create-trainee-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Trainee',
};
 
export default function Page() {
  return (
    <>
      <div className='grid grid-cols-3 justify-between items-center text-center mb-6'>
        <BackButton />
        <h1>Create Trainee</h1>
      </div>
      <CreateTraineeForm />
    </>
  )
}