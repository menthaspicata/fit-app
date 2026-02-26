import { BackButton } from '@/components/ui/back-button';
import { CreateTraineeForm } from '@/components/forms/create-trainee-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Trainee',
};
 
export default function Page() {
  return (
    <>
      <div className='grid grid-cols-3 justify-between items-center text-center mb-4'>
        <BackButton />
        <h1>Create Trainee</h1>
      </div>
      <CreateTraineeForm />
    </>
  )
}