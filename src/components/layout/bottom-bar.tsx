'use client'

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname } from 'next/navigation'
import { navItems } from '@/components/layout/nav-items';


export default function BottomBarClient() {
    const pathname = usePathname()

    return (
        <nav className='fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900  md:hidden'>
            <ul className='grid grid-flow-col justify-items-center justify-between py-2 px-4 md:px-8'>
                {navItems.map(({ href, label, icon }) => {
                    const isActive = pathname === href || 
                        (href !== '/dashboard' && pathname.startsWith(href))

                    return (
                        <li key={href}>
                            <Link href={href}
                                className={`flex flex-col items-center
                                ${isActive
                                    ? 'text-violet-800'
                                    : 'text-gray-800 hover:text-gray-600'
                                }`}
                            >
                                <FontAwesomeIcon icon={icon} className='h-5 w-5' />
                                {label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}