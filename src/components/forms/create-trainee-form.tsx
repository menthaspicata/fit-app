'use client';

import { createInvite, State } from '@/lib/actions/user';
import { useActionState } from 'react';
import { useState } from 'react';
import Button from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export function CreateTraineeForm() {
  const initialState: State = { message: null, errors: {}, inviteLink: null };
  const [state, formAction, isPending] = useActionState(createInvite, initialState);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!state.inviteLink) return;
    await navigator.clipboard.writeText(state.inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="grid gap-4 w-max mx-auto min-w-sm">
      <form action={formAction} className="grid gap-4">
        <div className="grid gap-1">
          <input
            type="text"
            className="border rounded-sm border-gray-300 outline outline-gray-500 px-4 py-2"
            name="username"
            id="trainee-username"
            placeholder="Trainee name"
            required
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
          )}
        </div>

        <Button
          className="cursor-pointer mt-2"
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Creating…' : 'Create Invite'}
        </Button>
      </form>

      {/* Result */}
      {state.message && !state.inviteLink && (
        <p className="text-sm text-red-500 text-center">{state.message}</p>
      )}

      {state.inviteLink && (
        <div className="grid gap-2 p-4 border border-sky-500 rounded-lg">
          <p className="text-sm font-medium flex items-center flex-col gap-1">
            <FontAwesomeIcon icon={faCircleCheck} className='text-green-600 text-2xl'/>
            Invite link ready!
          </p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={state.inviteLink}
              className="flex-1 text-sm bg-white border border-gray-300 rounded px-3 py-1.5 text-gray-700 truncate"
            />
            <Button
              onClick={handleCopy}
              className="shrink-0 px-3 py-1.5"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <p className="text-xs text-gray-400">Link expires in 7 days.</p>
        </div>
      )}
    </div>
  );
}
