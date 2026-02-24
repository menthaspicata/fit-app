import { Bars3Icon } from '@heroicons/react/24/solid';
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import Sidebar from '@/app/ui/sidebar';
import BottomBar from '@/app/ui/bottom-bar';
import { getServerSession } from '@/app/lib/getSession';
import Image from "next/image";

 
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const session = await getServerSession();

    console.log('DashboardLayout session:', session);    
    if(!session) {
        redirect("/login");
    }

  return (
    
    <div className="">
      <nav className="grid gap-2 grid-flow-col items-center mb-10">
          <Image
            src="/logo.svg"
            alt="TrainerHub logo"
            width={200}
            height={50}
            priority
          />
  
        <button className='relative cursor-pointer w-max justify-self-end'>              
          <Bars3Icon className="pointer-events-none left-3 top-1/2 h-[30px] w-[30px] text-gray-500 peer-focus:text-gray-900" />
        </button>
      </nav>
      {children} 
      {/* <Sidebar id={session?.user?.id} /> */}
      <BottomBar />
    </div>
  )
}
