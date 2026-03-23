import { Metadata } from 'next';
import { BackButton } from "@/components/ui/back-button";
import { TraineeCard } from '@/features/trainees/trainee-card';
import { getAllTrainees, fetchUserData } from '@/lib/actions/user'

export const metadata: Metadata = {
  title: 'Trainees',
};


export default async function TraineesPage() {
    const trainer = await fetchUserData();
    const filtered = await getAllTrainees();


  return (
    <div className="min-h-screen  font-sans">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-700/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-fuchsia-600/6 rounded-full blur-3xl" />
      </div>

      <div className="relative flex">
        {/* ── Left Panel: List ── */}
        <div className={`flex flex-col w-full flex-shrink-0 transition-all duration-300 
            
            `}>

          {/* Header */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <BackButton />
              <div className='flex-1'>
                <h1 className="text-2xl font-bold tracking-tight">My Trainees</h1>
                <p className="text-slate-400 text-sm mt-0.5">Hi, {trainer?.name} 👋</p>
              </div>
              <span className="bg-violet-600/20 text-violet-600 border border-violet-500/30 text-xs font-bold px-3 py-1.5 rounded-full">
                {filtered.length} active
              </span>
            </div>
          </div>

          {/* Cards list */}
          <div className="flex-1 overflow-y-auto pt-1 px-6 pb-6 space-y-3">
            {filtered.length === 0 && (
              <div className="text-center text-slate-500 py-16 text-sm">No trainees found.</div>
            )}
            {filtered.map(t => (
              <TraineeCard key={t.id} trainee={t}  />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
