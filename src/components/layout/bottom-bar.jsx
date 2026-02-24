import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faDumbbell, faPersonRunning, faUser } from '@fortawesome/free-solid-svg-icons'
import { fetchUserData } from '@/lib/actions/users.actions';

export default async function BottomBar() {
    const userData = await fetchUserData();
    return (
        <nav className='fixed bottom-0 left-0 right-0 dark:bg-neutral-900'>
            <ul className='grid grid-flow-col justify-items-center justify-between p-2'>
                <li>
                    <Link href="/dashboard" className='flex flex-col items-center'>
                        <FontAwesomeIcon icon={faHouse} className='h-5 w-5'/>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/workouts" className='flex flex-col items-center'>
                        <FontAwesomeIcon icon={faDumbbell} className='h-5 w-5' />
                        Workouts
                    </Link>
                </li>
                {userData?.role === 'trainer' ? 
                <li>
                    <Link href="/dashboard/trainees" className='flex flex-col items-center'>
                        <FontAwesomeIcon icon={faPersonRunning} className='h-5 w-5'/>
                        Trainees
                    </Link>
                </li>
                : null}
                <li>
                    <Link href="/dashboard/profile" className='flex flex-col items-center'>
                        <FontAwesomeIcon icon={faUser} className='h-5 w-5'/>
                        Profile
                    </Link>
                </li>
            </ul>
        </nav>
    )
}