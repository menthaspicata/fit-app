import LogoutButton from '@/components/layout/logout-button';
import Image from "next/image";
import { fetchUserData } from '@/lib/actions/users.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faPen } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile',
};
  

export default async function ProfilePage() {
    const userData = await fetchUserData();

    console.log( 'user data ', userData)
    return (
     
        <div className='grid justify-center items-center gap-2'>
            {userData && userData.image ? 
            
            <Image src={userData.image} alt="User image" width={100} height={100} />
            
            : <FontAwesomeIcon icon={faCircleUser} className='h-20 w-20' />
            }
            <h3>{userData.name}</h3> 
            <ul>
                <li >
                    <Link href="/dashboard/profile/edit" className='flex flex-row items-center'>
                    <FontAwesomeIcon icon={faPen} className='h-3 w-3 mr-2'/>
                        Edit profile
                    </Link>
                </li>
                {/* <li>
                    <Link>

                    </Link>
                </li>
                <li>
                    <Link>
                    </Link>
                </li> */}
            </ul>
            <LogoutButton />
        </div>
            
       
    )
    
}