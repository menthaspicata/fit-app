import Image from "next/image";
import { fetchTrainerData } from "@/app/lib/actions/trainer.actions";
import LogoutButton from "./logout-button";
import Link from 'next/link';
import { 
    UserIcon
 } from '@heroicons/react/24/solid';

export default function Sidebar(props: {id: string}) {
    const trainerData = fetchTrainerData(props.id);

    console.log('Trainer Data in Sidebar:', trainerData);
  return (
    <div className="w-64 h-full border-r p-4 fixed right-0 top-0 bg-gray-800">  
        <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
        {/* <Image src={trainerData.image} alt="Coach image" width={100} height={100} />
        <h3>{trainerData.name}</h3> */}
        {/* <p>{trainerData.bio}</p> */}
        <nav>
            <ul>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/dashboard/workouts">Workouts</Link></li>
                <li><Link href="/trainees">Trainees</Link></li>
                <li><Link href="/analytics">Analytics</Link></li>
                <li><Link href="/profile">          
                    <UserIcon className="pointer-events-none left-3 top-1/2 h-[30px] w-[30px] text-gray-500 peer-focus:text-gray-900" />
                    My Profile</Link></li>
                <li><Link href="/settings">Settings</Link></li>
                <li>Invite Clients</li>
                <li><LogoutButton /></li>
            </ul>
        </nav>
    </div>
)}