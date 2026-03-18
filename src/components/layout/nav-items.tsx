
import { faHouse, faDumbbell, faPersonRunning, faUser, faClipboardList } from '@fortawesome/free-solid-svg-icons'

export const navItems = [
    { href: '/dashboard', label: 'Home', icon: faHouse },
    { href: '/dashboard/workouts', label: 'Workouts', icon: faDumbbell },
    { href: '/dashboard/trainees', label: 'Trainees', icon: faPersonRunning, for_trainer: true },
    { href: '/dashboard/invites', label: 'Invites', icon: faClipboardList, for_trainer: true },
    { href: '/dashboard/profile', label: 'Profile', icon: faUser },
]