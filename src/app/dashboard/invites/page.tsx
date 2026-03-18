import { getAllInvites } from '@/lib/actions/invites';
import { DeleteInviteButton } from '@/features/invites/invite-remove';
import { fmtDate, avatarGradient, initials, statusConfig, isExpired } from '@/features/trainees/helpers';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Invites' };


export default async function InvitesPage() {
  const invites = await getAllInvites();

  const pending  = invites.filter((i) => i.status === 'PENDING' && !isExpired(i.expiresAt));
  const accepted = invites.filter((i) => i.status === 'ACCEPTED');
  const expired  = invites.filter((i) => i.status !== 'ACCEPTED' && isExpired(i.expiresAt));

  return (
    <div className="max-w-3xl mx-auto">

    {/* ── Header ── */}
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Invites</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            {invites.length} invite{invites.length !== 1 ? 's' : ''} sent
        </p>
        </div>
        <Link
        href="/dashboard/create-trainee"
        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[0.99] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-violet-200 transition-all"
        >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="hidden sm:inline">New Invite</span>
        </Link>
    </div>

    {/* ── Stats strip ── */}
    {invites.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-5">
        {[
            { label: 'Pending',  count: pending.length,  pill: 'bg-amber-50 border-amber-200 text-amber-600' },
            { label: 'Accepted', count: accepted.length, pill: 'bg-emerald-50 border-emerald-200 text-emerald-600' },
            { label: 'Expired',  count: expired.length,  pill: 'bg-gray-100 border-gray-200 text-gray-500' },
        ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 text-center">
            <p className="text-xl font-bold text-gray-900">{s.count}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.pill} mt-1 inline-block`}>
                {s.label.toUpperCase()}
            </span>
            </div>
        ))}
        </div>
    )}

    {/* ── Empty state ── */}
    {invites.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        </div>
        <p className="text-sm font-semibold text-gray-400">No invites sent yet</p>
        <p className="text-xs text-gray-300 mt-1 mb-5">Create an invite link to onboard a trainee</p>
        <Link
            href="/dashboard/trainees/create"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-violet-200 transition-all"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Invite
        </Link>
        </div>
    )}

    {/* ── Invite list ── */}
    {invites.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Column headers — desktop */}
        <div className="hidden sm:grid grid-cols-[1fr_110px_120px_80px_40px] items-center px-6 py-3 border-b border-gray-50">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Trainee</span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Status</span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Sent</span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Expires</span>
            <span />
        </div>

        <div className="divide-y divide-gray-50">
            {invites.map((invite) => {
            const cfg     = statusConfig(invite.status, invite.expiresAt);
            const expired = isExpired(invite.expiresAt) && invite.status === 'pending';
            const name    = invite.name ?? invite.email ?? 'Unknown';

            return (
                <div
                key={invite.id}
                className="flex sm:grid sm:grid-cols-[1fr_110px_120px_80px_40px] items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
                >
                {/* Avatar + name */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${expired ? 'from-gray-300 to-gray-400' : avatarGradient(name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm`}>
                    {initials(name)}
                    </div>
                    <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
                    {invite.email && invite.name && (
                        <p className="text-xs text-gray-400 truncate">{invite.email}</p>
                    )}
                    {/* Mobile: status + dates stacked below name */}
                    <div className="sm:hidden flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.pill}`}>
                        {invite.status}
                        </span>
                        <span className="text-[10px] text-gray-400">
                        Sent {fmtDate(invite.createdAt)} · Exp {fmtDate(invite.expiresAt)}
                        </span>
                    </div>
                    </div>
                </div>

                {/* Status — desktop */}
                <div className="hidden sm:flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${cfg.pill}`}>
                    {invite.status}
                    </span>
                </div>

                {/* Sent — desktop */}
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-600">{fmtDate(invite.createdAt)}</p>
                </div>

                {/* Expires — desktop */}
                <div className="hidden sm:block">
                    <p className={`text-sm ${expired ? 'text-red-400' : 'text-gray-600'}`}>
                    {fmtDate(invite.expiresAt)}
                    </p>
                </div>

                {/* Delete */}
                <div className="flex items-center justify-end flex-shrink-0">
                    <DeleteInviteButton id={invite.id} />
                </div>
                </div>
            );
            })}
        </div>
        </div>
    )}
    </div>
  );
}