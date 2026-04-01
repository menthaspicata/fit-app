import LogoutButton from '@/components/layout/logout-button';
import { BackButton } from '@/components/ui/back-button';
import Image from 'next/image';
import { fetchUserData } from '@/lib/actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEnvelope, faShield } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { initials } from '@/features/helpers';
import { ThemeToggle } from '@/components/layout/theme-toggle';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const userData = await fetchUserData();

  if (!userData) redirect('/login');

  return (
    <div className="max-w-lg mx-auto">
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-violet-100 tracking-tight">Profile</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your account settings</p>
      </div>

      {/* ── Avatar + name card ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden mb-4">
        <div className="px-6 py-6 flex items-center gap-5">

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {userData.image ? (
              <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-violet-100">
                <Image
                  src={userData.image}
                  alt={userData.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200 dark:shadow-purple-700">
                <span className="text-xl font-bold text-white">{initials(userData.name)}</span>
              </div>
            )}
            {/* Online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
          </div>

          {/* Name + role */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 dark:text-violet-100 truncate">{userData.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold bg-violet-50 text-violet-600 border border-violet-100 px-2 py-0.5 rounded-full capitalize">
                {userData.role ?? 'Trainer'}
              </span>
              {userData.emailVerified && (
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>

          {/* Edit button */}
          <Link
            href="/dashboard/profile/edit"
            className="flex-shrink-0 w-9 h-9 bg-gray-100 dark:bg-slate-800 hover:bg-violet-500 hover:border-violet-200 border border-transparent rounded-xl flex items-center justify-center transition-all group"
          >
            <FontAwesomeIcon icon={faPen} className="w-3.5 h-3.5 text-gray-400 group-hover:text-violet-600 transition-colors" />
          </Link>
        </div>

        {/* Email row */}
        {userData.email && (
          <div className="flex items-center gap-3 px-6 py-3.5 border-t border-gray-50 dark:border-gray-800">
            <div className="w-8 h-8 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wide">Email</p>
              <p className="text-sm text-gray-700 dark:text-gray-500 font-medium">{userData.email}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden mb-4 flex justify-between items-center px-6">
        <h3 className="text-lg font-bold text-gray-500 dark:text-gray-300 py-4">Theme</h3>
        <ThemeToggle />
      </div>

      {/* ── Danger zone ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 dark:border-gray-800">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Session</h3>
        </div>
        <div className="px-6 py-4">
          <LogoutButton />
        </div>
      </div>

    </div>
  );
}
