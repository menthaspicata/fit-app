'use client';

import { createInvite, State } from '@/lib/actions/user';
import { useActionState } from 'react';
import { useState } from 'react';
import Button from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCopy, faCheck, faEnvelope, faUser, faLink, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
      <div className="w-full max-w-md mx-auto">
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">

          {/* Header */}
          <div className="px-6 pt-6 pb-5 border-b border-gray-50 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-violet-50 dark:bg-slate-800 border border-violet-100 dark:border-slate-800 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-violet-600" />
              </div>
              <p className="text-sm text-gray-400">
              Generate an invite link to send to your new trainee.
            </p>
            </div>
            
          </div>

          {/* Form body */}
          <div className="px-6 py-5">
            <form action={formAction} className="space-y-4">

              {/* Name field */}
              <div>
                <label
                  htmlFor="trainee-username"
                  className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5"
                >
                  Trainee Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="trainee-username"
                    name="username"
                    placeholder="e.g. Sofia Morlaunt"
                    required
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 dark:bg-slate-700  dark:border-slate-600 dark:text-violet-100 dark:focus:ring-slate-600 dark:focus:border-slate-800 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  />
                </div>
                {state.errors?.name && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              {/* Error message */}
              {state.message && !state.inviteLink && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  {state.message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full cursor-pointer bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] text-white font-semibold text-sm py-3 rounded-xl shadow-md shadow-violet-200 dark:shadow-purple-800/50 transition-all duration-150 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                    Generate Invite Link
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Invite link result */}
          {state.inviteLink && (
            <div className="mx-6 mb-6 bg-emerald-50 border border-emerald-200 rounded-2xl overflow-hidden">
              {/* Success header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-emerald-100">
                <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">Invite link ready!</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Link expires in 7 days.</p>
                </div>
              </div>

              {/* Link row */}
              <div className="px-4 py-3.5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faLink} className="w-3 h-3" />
                  Invite URL
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0 bg-white border border-emerald-200 rounded-xl px-3 py-2">
                    <p className="text-xs text-gray-600 truncate font-mono">{state.inviteLink}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200
                      ${copied
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                        : 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                      }`}
                  >
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-3 h-3" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Helper text */}
        <p className="text-xs text-center text-gray-400 mt-4">
          The trainee will be added to your roster once they accept the invite.
        </p>
      </div>
  );
}
