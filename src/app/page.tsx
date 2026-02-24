import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/app/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className=" dark:text-dark-text p-4">
        <header className="flex justify-between items-center">
          <Image
            className={styles.logo}
            src="logo.svg"
            alt="TrainerHub logo"
            width={200}
            height={50}
            priority
          />
          <button className="ml-auto mr-1 border-2 border-sky-700 text-sky-700 rounded-sm px-4 py-2 cursor-pointer w-max"><Link href="/login">Login</Link></button>
          <button className=" gradient-button border-2 border-blue-500 rounded-sm px-4 py-2 cursor-pointer w-max"><Link href="/signup">Get Started Free</Link></button>
        </header>
        <section className="flex justify-between flex-col md:flex-row mt-15 relative pt-5 pb-15 mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-5 relative z-2">
              Your Ideal Trainer Hub
            </h1>
            <p className="mt-4 mb-5 max-w-xl text-gray-400 relative z-2">
              Create workouts, track progress, and inspire your clients - all in one app.
            </p>
            <button className="gradient-button rounded-sm border-2 border-blue-500 px-4 py-2 cursor-pointer mb-5 w-max"><Link href="/signup">Get Started Free</Link></button>
          </div>
         
          <Image
            className="opacity-75 
            align-self-center
            sm:align-self-end
            sm:w-1/2 md:w-1/2 lg:w-1/3"
            src="/phone1.png"
            alt="Dashboard Mockup"
            width={800}
            height={1000}
          />
        </section>
        <section>
          <ul className="flex gap-10 items-center mb-20 flex-col sm:flex-row justify-center">
            <li className="flex flex-col items-center w-2/3 md:w-1/4 text-center">
              <Image src="/icons/dumbbell.png" alt="dumbbell" width={50} height={50} />
              <h3>Flexible Workouts</h3>
              <p className="text-gray-600">Create workouts tailored for every client and training goal.</p>
            </li>
            <li className="flex flex-col items-center w-2/3 md:w-1/4 text-center">
              <Image src="/icons/growing-up.png" alt="Progress Tracking" width={50} height={50} />
              <h3>Progress Tracking</h3>
              <p className="text-gray-600">Visualize results and celebrate achievements for maximum motivation.</p>
            </li>
            <li className="flex flex-col items-center w-2/3 md:w-1/4 text-center">
              <Image src="/icons/gays=).png" alt="Client Management" width={50} height={50} />
              <h3>Client Management</h3>
              <p className="text-gray-600">Efficiently manage client profiles, schedules, and communication.</p>
            </li>
          </ul>
        </section>

        <footer>
          <p className="mt-20 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} TrainerHub
          </p>
        </footer>
      </main>
    </div>
  );
}
