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
      <div className="relative flex w-full flex-col items-center gradient-card rounded-lg border border-neutral-200 py-10 shadow-lg max-w-md">
        <div className={`flex items-center mb-5 text-2xl ${zalandoSansExpanded.className}`}>
            <Image src='/ConnectFit-logo.png' width={50} height={50} alt='ConnectFit logo' 
            className='mr-5'/>
            ConnectFit
        </div>        
        <h1 className="text-2xl">Welcome back!</h1>
        <p className="text-gray-500 mb-5">Sign in to manage your workouts</p>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}