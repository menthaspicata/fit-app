import type { Metadata } from "next";
import "./globals.css";
import { zalandoSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Athlance - Your Ideal Trainer Hub",
  description: "Your Ideal Trainer Hub - Create workouts, track progress, and inspire your clients - all in one app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'p-8 '+`${zalandoSans.className} `}> 
        {children}
      </body>
    </html>
  );
}
