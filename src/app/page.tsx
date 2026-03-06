import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { zalandoSansExpanded } from "@/lib/fonts";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className="bg-white rounded-2xl shadow-lg border-light-border border-2 dark:text-dark-text ">
        <header className="p-4 px-8 flex justify-between items-center border-light-border border-b-2">
        <div className={`flex items-center mb-5 text-2xl ${zalandoSansExpanded.className}`}>
            <Image src='/ConnectFit-logo.png' width={50} height={50} alt='ConnectFit logo' 
            className='mr-5'/>
            ConnectFit
        </div>
          <button className="ml-auto mr-1 px-4 py-2 cursor-pointer w-max"><Link href="/login">Login</Link></button>
          <button className=" bg-light-primary-button text-white  rounded-md px-4 py-2 cursor-pointer w-max"><Link href="/signup">Get Started Free</Link></button>
        </header>
        <section className="flex justify-between items-start flex-col md:flex-row relative p-4 px-8 pb-15 mt-10">
          <div>
            <h1 className="text-4xl font-bold mb-5 relative z-2">
              Connect. Track. Transform. Your Ecosystem.
            </h1>
            <p className="mt-4 mb-5 max-w-xl relative z-2">
              Effortlessly bridge the gap between clients and trainers for uitimate accountability and results.
            </p>
            <button className="bg-light-primary-button text-white  rounded-md px-4 py-2 cursor-pointer mb-5 w-max"><Link href="/signup">Get Started Free</Link></button>
          </div>
          <Image
            className="
            align-self-center
           
            rounded-2xl
            sm:w-1/2 md:w-1/2 lg:w-1/4"
            src="/man-and-woman1.png"
            alt="Trainer and Client"
            width={500}
            height={500}
          />
          <Image
            className="
            align-self-center
            sm:align-self-end
            pointer-events-none
            -ml-20 -mt-30
            sm:w-1/2 md:w-1/2 lg:w-1/4"
          
            src="/iphone.png"
            alt="Dashboard Mockup"
            width={150}
            height={300}
          />
        </section>
        <section className="text-center px-8">
          <h2 className="text-3xl font-bold">Features</h2>
          <p>Connect between clients and trainers for for <br/> ultimate accountability and results.</p>
          <ul className="flex flex-row justify-between">
            <li className="p-5 rounded-2xl border border-neutral-200 card-light-gradient">
              <h3>Workout Scheduling</h3>
            </li>
             <li className="p-5 rounded-2xl border border-neutral-200 card-light-gradient">
              <h3>Real-Time Tracking</h3>
            </li>
             <li className="p-5 rounded-2xl border border-neutral-200 card-light-gradient">
              <h3>Progress Sync</h3>
            </li>
          </ul>
        </section>

        <footer>
          <p className="mt-20 p-4 px-8 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} ConnectFit
          </p>
        </footer>
      </main>
    </div>
  );
}
