'use client'

import Image from "next/image";
import Link from 'next/link';
import { navItems } from '@/components/layout/nav-items';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zalandoSansExpanded } from "@/lib/fonts";

export default function Sidebar() {
    const pathname = usePathname();

    return (
    <div className="w-64 h-full p-4 fixed left-0 top-0 bg-white shadow hidden md:block">  

        <nav>
            <div className={`flex mb-5 items-center text-xl ${zalandoSansExpanded.className}`}>
                <Image src='/Athlance-logo.png' width={30} height={30} alt='ConnectFit logo' 
                className='mr-5'/>
                ConnectFit
            </div>
            <ul className="grid gap-2">
                {navItems.map(({ href, label, icon }) => {
                    const isActive = pathname === href || 
                        (href !== '/dashboard' && pathname.startsWith(href))

                    return (
                        <li key={href}>
                            <Link href={href}
                                className={`flex items-center text-base
                                ${isActive
                                    ? 'text-violet-800'
                                    : 'text-gray-800 hover:text-gray-600'
                                }`}
                            >
                                <FontAwesomeIcon icon={icon} className='mr-2 h-6 w-6' />
                                {label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    </div>
    )}