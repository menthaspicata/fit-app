'use client'

import Button from '../ui/button';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { FormErrorBanner } from '@/components/forms/components/form-error-banner';
import { Field } from '@/components/forms/components/field';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function authenticate(formData: FormData) {
    setError(null);
    setIsPending(true);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/dashboard',
    });

    if (error) {
      setError(error.message ?? 'Something went wrong. Please try again.');
      setIsPending(false);
    }
  }

  return (
    <form action={authenticate} className="space-y-3" noValidate>
      <FormErrorBanner message={error} />

      <div className="w-full">
        <Field
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Field
          id="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          required
        />
      </div>

      <Button type="submit" className="mt-4 w-full" disabled={isPending}>
        {isPending ? 'Logging in…' : 'Login'}
      </Button>
    </form>
  );
}
