'use client'

import Link from 'next/link';
import { navItems } from '@/components/layout/nav-items';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react";
import { avatarGradient, initials } from '@/features/helpers';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/layout/theme-toggle'

export default function Sidebar({ user }: { user: any }) {
    const pathname = usePathname();
      const [activeNav, setActiveNav] = useState(pathname);

    return (
    <div className="w-64 h-full p-4 fixed left-0 top-0 bg-white dark:bg-slate-900 shadow hidden md:flex flex-col">  

        {/* Nav */}
        <nav className="flex-1 space-y-1">
        <Logo />
          {navItems.map(({ href, label, icon, for_trainer }) => {
            if (for_trainer && user.role !== 'trainer') {
              return null;
            }

            return (
              <Link href={href} key={href} onClick={() => setActiveNav(href)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-150
                  ${
                    activeNav === href
                      ? "bg-violet-50 text-violet-700 dark:bg-indigo-950"
                      : "text-gray-500 hover:bg-gray-50 dark:hover:bg-indigo-900 hover:text-gray-800 dark:hover:text-indigo-200"
                  }`}
              >
                <FontAwesomeIcon icon={icon} className={`mr-2 h-6 w-6 ${
                    activeNav === href ? "text-violet-600" : "text-gray-400 "
                  }`}
                />
                {label}
                {href === "/trainees" && (
                  <span className="ml-auto bg-violet-100 text-violet-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    12
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <ThemeToggle />
        {/* Avatar */}
        <div className="flex items-center gap-3 px-2 pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
          <div className={`w-10 h-10 text-white rounded-2xl bg-gradient-to-br ${avatarGradient(user.id)} flex items-center justify-center text-sm font-bold dartext-white shadow-xl`}>
            {user.image ? <img src={user.image} alt={user.name} className="w-full h-full object-cover rounded-2xl" /> : initials(user.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-800 dark:text-violet-200 truncate">{ user.name }</div>
            <div className="text-xs text-gray-400 dark:text-gray-300 uppercase">{ user.role }</div>
          </div>
        </div>
    </div>
    )}