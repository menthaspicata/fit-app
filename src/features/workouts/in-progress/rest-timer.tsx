'use client';

import { fmtDuration } from '@/features/helpers';

interface RestTimerBannerProps {
  restSeconds: number;
  onSkip: () => void;
}

export function RestTimerBanner({ restSeconds, onSkip }: RestTimerBannerProps) {
  return (
    <div className="mb-4 flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wide">Rest Timer</p>
        <p className="text-lg font-bold text-amber-700 font-mono tabular-nums">{fmtDuration(restSeconds)}</p>
      </div>
      <button
        onClick={onSkip}
        className="text-xs font-semibold text-amber-600 hover:text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors"
      >
        Skip
      </button>
    </div>
  );
}

