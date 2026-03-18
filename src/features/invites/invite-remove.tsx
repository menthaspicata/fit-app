'use client';

import { useState } from 'react';
import { deleteInvite } from '@/lib/actions/invites';

export function DeleteInviteButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading]       = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deleteInvite(id);
    setLoading(false);
    setConfirming(false);
  }

  // First click — show red confirm state
  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="w-8 h-8 rounded-xl hover:bg-red-50 flex items-center justify-center transition-all group"
        title="Delete invite"
      >
        <svg className="w-4 h-4 text-gray-300 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    );
  }

  // Second click — confirm / cancel
  return (
    <div className="flex items-center gap-1">
      {/* Cancel */}
      <button
        onClick={() => setConfirming(false)}
        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        title="Cancel"
      >
        <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Confirm delete */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="w-7 h-7 rounded-lg bg-red-500 hover:bg-red-600 disabled:opacity-60 flex items-center justify-center transition-colors"
        title="Confirm delete"
      >
        {loading ? (
          <svg className="w-3.5 h-3.5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
    </div>
  );
}