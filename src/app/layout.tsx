import type { Metadata } from "next";
import "./globals.css";
import { zalandoSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "ConnectFit - Your Ideal Trainer Hub",
  description: "Your Ideal Trainer Hub - Create workouts, track progress, and inspire your clients - all in one app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'p-4 md:p-8 min-h-dvh bg-light-primary '+`${zalandoSans.className} `}> 
        {children}
      </body>
    </html>
  );
}
