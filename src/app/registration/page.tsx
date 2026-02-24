import RegistrationForm from '@/app/ui/registration-form';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Athlance',
};
 
export default function RegistrationPage() {
  return (
    <main className="flex items-center justify-center ">
        <Suspense>
          <RegistrationForm />
        </Suspense>
    </main>
  );
}