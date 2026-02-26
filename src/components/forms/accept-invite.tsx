'use client';

import { acceptInvite, State } from '@/lib/actions/users.actions';
import { useActionState } from 'react';
import { Field } from '@/components/forms/components/field';
import Button from '@/components/ui/button';

export function AcceptInviteForm({ token }: { token: string }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(acceptInvite, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      {/* Error feedback (redirect handles success, so only show errors here) */}
      {state.message && (
        <p className="text-sm text-center text-red-500">{state.message}</p>
      )}

      {/* Hidden token */}
      <input type="hidden" name="token" value={token} />

      {/* Name */}
      <div className="grid">
        <Field id="name" label="Full name" placeholder="John Doe"  errors={state.errors?.name} />
      </div>

      {/* Email */}
      <div className="grid">
        <Field id="email" label="Email" type="email" placeholder="Email" required errors={state.errors?.email} />
      </div>

      {/* Password */}
      <div className="grid">
        <Field id="password" label="Password" type="password" placeholder="Min. 8 characters" required errors={state.errors?.password} />
      </div>

      {/* Photo */}
      <div className="grid">
        <label htmlFor="photo" className="text-sm font-medium text-gray-700 mb-2">
          Profile photo <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          className="text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="mt-2"
      >
        {isPending ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  );
}
