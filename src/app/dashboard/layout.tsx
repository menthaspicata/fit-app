import { Bars3Icon } from '@heroicons/react/24/solid';
import { redirect } from "next/navigation";
import BottomBar from '@/components/layout/bottom-bar';
import { getServerSession } from '@/lib/getSession';
import Image from "next/image";
import { zalandoSansExpanded } from "@/lib/fonts";

 
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
      <nav className="grid gap-2 grid-flow-col items-center mb-3">
        <div className={`flex items-center text-xl ${zalandoSansExpanded.className}`}>
            <Image src='/Athlance-logo.png' width={30} height={30} alt='Athlance logo' 
            className='mr-5'/>
            Athlance
        </div>
  
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
