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
        <svg width="100" height="100"  fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <g fill="#40009B">
              <path d="M85.081,49.18c1.05-2.339,1.802-5.371,0.565-8.089c-1.443-3.17-5.143-4.938-10.996-5.252l-1.292-0.003l-0.099,0.003c-1.119,0.06-2.134,0.19-3.095,0.356c-0.047,1.25-0.242,2.542-0.58,3.869c1.244-0.312,2.597-0.467,3.824-0.536h1.092c2.993,0.167,6.753,0.838,7.782,3.088c0.508,1.112,0.334,2.513-0.114,3.859c-2.363-1.661-5.241-2.639-8.349-2.639c-1.297,0-2.551,0.179-3.748,0.498c2.028,3.593,3.129,7.677,3.129,11.84c0,5.831-2.085,11.184-5.547,15.354c1.874,0.88,3.958,1.386,6.166,1.386c8.03,0,14.539-6.509,14.539-14.539C88.359,54.886,87.129,51.685,85.081,49.18z"/>
              <path d="M28.25,44.22c-1.066-0.25-2.177-0.384-3.32-0.384c-3.011,0-5.808,0.915-8.128,2.482c-0.409-1.298-0.554-2.632-0.065-3.702c1.028-2.25,4.788-2.922,7.782-3.088h1.092c1.094,0.061,2.29,0.19,3.417,0.439c-0.328-1.316-0.51-2.597-0.552-3.836c-0.854-0.132-1.744-0.24-2.717-0.292l-1.292-0.003l-0.1,0.003c-5.853,0.315-9.552,2.083-10.995,5.252c-1.2,2.637-0.527,5.569,0.474,7.878c-2.155,2.536-3.457,5.818-3.457,9.406c0,8.03,6.509,14.539,14.539,14.539c2.068,0,4.032-0.438,5.813-1.216c-3.548-4.195-5.694-9.612-5.694-15.524C25.049,51.957,26.177,47.84,28.25,44.22z"/>
              <path d="M65.449,42.844c1.522-3.391,2.612-7.786,0.819-11.725c-2.092-4.596-7.455-7.158-15.938-7.615L48.456,23.5l-0.144,0.004c-8.484,0.457-13.846,3.019-15.938,7.615c-1.74,3.822-0.764,8.073,0.686,11.42c-3.123,3.675-5.011,8.434-5.011,13.635c0,11.64,9.436,21.076,21.076,21.076s21.076-9.436,21.076-21.076C70.201,51.116,68.418,46.476,65.449,42.844z M37.342,38.696c-0.593-1.881-0.803-3.815-0.094-5.366c1.491-3.262,6.941-4.236,11.281-4.477h1.583c4.339,0.241,9.79,1.215,11.281,4.477c0.737,1.613,0.485,3.642-0.165,5.594c-3.425-2.408-7.597-3.826-12.103-3.826C44.76,35.098,40.706,36.424,37.342,38.696z"/>
            </g>
          </g>
        </svg>
            ConnectFit
        </div>
          <button className="ml-auto mr-1 px-4 py-2 cursor-pointer w-max"><Link href="/login">Login</Link></button>
          <button className=" bg-light-primary-button text-white  rounded-md px-4 py-2 cursor-pointer w-max"><Link href="/registration">Get Started Free</Link></button>
        </header>
        <section className="flex justify-between items-start flex-col md:flex-row relative p-4 px-8 pb-15 mt-10">
          <div>
            <h1 className="text-4xl font-bold mb-5 relative z-2">
              Connect. Track. Transform. Your Ecosystem.
            </h1>
            <p className="mt-4 mb-5 max-w-xl relative z-2">
              Effortlessly bridge the gap between clients and trainers for uitimate accountability and results.
            </p>
            <button className="bg-light-primary-button text-white  rounded-md px-4 py-2 cursor-pointer mb-5 w-max"><Link href="/registration">Get Started Free</Link></button>
          </div>
          <Image
            className="
            align-self-center 
            md:ml-10 md:-mt-10
            md:w-160"
            src="/man-and-woman-phone.png"
            alt="Trainer and Client"
            width={700}
            height={500}
          />
        </section>
        <section className="text-center px-8">
          <h2 className="text-3xl font-bold mb-3">Features</h2>
          <p className="mb-3">Connect between clients and trainers for for <br/> ultimate accountability and results.</p>
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
