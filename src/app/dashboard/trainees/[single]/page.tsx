import { Metadata } from 'next';
import { getTraineeById } from '@/lib/actions/user';
import { initials, fmtDate, avgDuration, lastSeen, statusColor, avatarGradient } from '@/features/trainees/helpers';

export const metadata: Metadata = {
  title: 'Trainee Detail',
};


export default async function Page({
  params,
}: {
  params: Promise<{ single: string }>
}) {
  const { single } = await params;
  return <div>
    <TraineeDetail single={single} />
  </div>
}

// Single Trainee Detail View
async function TraineeDetail({ single }: { single: string }) {
  const trainee = await getTraineeById(single);

  if (!trainee) {
    return <div>Trainee not found</div>;
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-6 pb-0">
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarGradient(trainee.id)} flex items-center justify-center text-xl font-bold dartext-white shadow-xl`}>
            {trainee.image ? <img src={trainee.image} alt={trainee.name} className="w-full h-full object-cover rounded-2xl" /> : initials(trainee.name)}
          </div>
          <div>
            <h2 className="text-xl font-bold dark:text-white">{trainee.name}</h2>
            <p className="text-slate-400 text-sm">{trainee.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${trainee.emailVerified ? "bg-emerald-500/20 text-emerald-600" : "bg-amber-500/20 text-amber-400"}`}>
                {trainee.emailVerified ? "✓ Verified" : "Unverified"}
              </span>
              <span className="text-xs text-slate-500">Since {fmtDate(trainee.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}