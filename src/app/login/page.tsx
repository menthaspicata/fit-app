import LoginForm from '@/components/forms/login-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { zalandoSansExpanded } from "@/lib/fonts";

export const metadata: Metadata = {
  title: 'Login',
};
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center">
      <div className="relative flex w-full flex-col items-center">
        <div className={`flex items-center mb-5 text-2xl ${zalandoSansExpanded.className}`}>
            <Image src='/Athlance-logo.png' width={50} height={50} alt='Athlance logo' 
            className='mr-5'/>
            Athlance
        </div>        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-gray-500">Sign in to manage your workouts</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}