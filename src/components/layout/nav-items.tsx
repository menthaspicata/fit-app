
import { faHouse, faDumbbell, faPersonRunning, faUser } from '@fortawesome/free-solid-svg-icons'

export const navItems = [
    { href: '/dashboard', label: 'Home', icon: faHouse },
    { href: '/dashboard/workouts', label: 'Workouts', icon: faDumbbell },
    { href: '/dashboard/trainees', label: 'Trainees', icon: faPersonRunning },
    { href: '/dashboard/profile', label: 'Profile', icon: faUser },
]