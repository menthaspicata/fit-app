import RegistrationForm from '@/components/forms/registration-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { zalandoSansExpanded } from '@/lib/fonts';
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Sign Up - Athlance',
};
 
export default function RegistrationPage() {
  return (
    <main className="flex items-center justify-center">
      <div className='relative flex w-full flex-col items-center gradient-card rounded-lg border border-neutral-200 py-10 shadow-lg max-w-md'>
                <div className={`flex items-center mb-5 text-2xl ${zalandoSansExpanded.className}`}>
                  <Image
                    src="/ConnectFit-logo.png"
                    width={50}
                    height={50}
                    alt="ConnectFit logo"
                    className="mr-5"
                  />
                  ConnectFit
                </div>
        
                <h1 className="mb-3 text-2xl">Create an account</h1>
        <Suspense>
          <RegistrationForm />
        </Suspense>
        </div>
    </main>
  );
}