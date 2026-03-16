import { redirect } from "next/navigation";
import BottomBar from '@/components/layout/bottom-bar';
import Sidebar from '@/components/layout/sidebar';
import { getServerSession } from '@/lib/getSession';
import { fetchUserData } from '@/lib/actions/user';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const session = await getServerSession();
   
    if(!session) {
        redirect("/login");
    }

    const user = await fetchUserData();

  return (
    <div className="pb-6 md:width-[calc(100vw-16rem)] md:ml-[16rem]">
      <Sidebar user={user} />
      {children} 
      <BottomBar />
    </div>
  )
}
