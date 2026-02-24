'use client';

import Button from "@/app/ui/button";
import { useRouter } from 'next/navigation';
import { authClient } from '@/app/lib/auth-client';


export default function LogoutButton() {
     const router = useRouter();
     
    async function handleLogout() {
       
        await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
            router.push("/login"); // redirect to login page
            },
        },
    });
  }


  return (
        <Button className="w-auto cursor-pointer" onClick={handleLogout}> 
            Logout
        </Button>
  );
}