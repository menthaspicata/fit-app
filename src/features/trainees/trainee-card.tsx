import Link from 'next/link';
import { initials, avatarGradient } from '@/features/trainees/helpers';

// Trainee Card
export function TraineeCard({ trainee: trainee }: { trainee: any }) {
  return (
    <Link href={`/dashboard/trainees/${trainee.id}`}
      className="group block cursor-pointer w-full text-left bg-white hover:bg-slate-100 border border-slate-400/50 hover:border-violet-500/60 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-0.5 backdrop-blur-sm"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${avatarGradient(trainee.id)} flex items-center justify-center font-bold text-white text-sm shadow-lg`}>
          {trainee.image ? <img src={trainee.image} alt={trainee.name} className="w-full h-full object-cover rounded-xl" /> : initials(trainee.name)}
          {trainee.emailVerified && (
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-800 flex items-center justify-center">
              <svg className="w-2 h-2 text-slate-900" fill="currentColor" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="font-semibold dark:text-white text-sm truncate group-hover:text-violet-300 transition-colors">{trainee.name}</h3>
            <svg className="w-4 h-4 text-slate-600 group-hover:text-violet-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
          <p className="text-xs text-slate-500 truncate mb-3">{trainee.email}</p>
        </div>
      </div>
    </Link>
  );
}