'use client'

import Button from '@/components/ui/button';
import Image from "next/image";
import { State, signUpAction } from '@/lib/actions/registration';
import { useActionState } from 'react';
import { zalandoSansExpanded } from "@/lib/fonts";
import { FormErrorBanner } from '@/components/forms/components/form-error-banner';
import { Field } from '@/components/forms/components/field';

export default function RegistrationForm() {
  const initialState: State = { message: null, errors: {} };

  const [state, formAction, isPending] = useActionState(
    (_state: State, formData: FormData) => signUpAction(formData),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3" noValidate>
      <div className="flex-1">
        <div className={`flex items-center mb-5 text-2xl ${zalandoSansExpanded.className}`}>
          <Image
            src="/Athlance-logo.png"
            width={50}
            height={50}
            alt="Athlance logo"
            className="mr-5"
          />
          Athlance
        </div>

        <h1 className="mb-3 text-2xl">Create an account</h1>

        {/* Top-level error banner (e.g. email already taken) */}
        <FormErrorBanner message={state.message} />

        <div className="w-full mt-4">
          <Field
            id="name"
            label="Name"
            placeholder="Enter your name"
            errors={state.errors?.name}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            required
            errors={state.errors?.email}
          />
          <Field
            id="password"
            label="Password"
            type="password"
            placeholder="Password (min. 8 characters)"
            required
            errors={state.errors?.password}
          />
          <Field
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Repeat your password"
            required
            errors={state.errors?.confirmPassword}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Creating account…' : 'Sign Up'}
      </Button>
    </form>
  );
}
