import { BackButton } from '@/components/ui/back-button';
import { CreateTraineeForm } from '@/components/forms/create-trainee-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Trainee',
};
 
export default function Page() {
  return (
    <>
      <div className='flex items-center mb-4'>
        <BackButton />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Create Trainee
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5 hidden sm:block">
            Create a new trainee profile and generate an invite link
          </p>
        </div>
      </div>
      <CreateTraineeForm />
    </>
  )
}