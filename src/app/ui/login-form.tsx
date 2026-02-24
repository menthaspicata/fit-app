'use client'

import {
  AtSymbolIcon,
  KeyIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import Button from '../ui/button';
import { useSearchParams } from 'next/navigation';
import { useActionState, useState } from 'react';
import { authClient } from '@/app/lib/auth-client';
import { email } from 'zod';



export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function authenticate(formData: FormData) {
    const data = await authClient.signIn.email({ email, password, callbackURL: "/dashboard", });
  }


  return (
    <form action={authenticate} className="space-y-3">
        <div className="w-full">
          <div>
            <label
              className="mb-2 text-xs"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md  py-[9px] pl-10 text-sm "
                id="email"
                type="email"
                name="email"
                value={email}
                 onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-2 text-xs"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md py-[9px] pl-10 text-sm"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)} 
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
       <Button className="mt-4 w-full">
          Login
        </Button>

        {/* <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div> */}
    </form>
  );
}
