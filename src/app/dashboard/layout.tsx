import { redirect } from "next/navigation";
import BottomBar from '@/components/layout/bottom-bar';
import Sidebar from '@/components/layout/sidebar';
import { getServerSession } from '@/lib/getSession';

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
    <div className="pb-6 md:width-[calc(100vw-16rem)] md:ml-[16rem]">
        {children} 
        <Sidebar />
        <BottomBar />
    </div>
  )
}
