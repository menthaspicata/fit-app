import type { Metadata } from "next";
import "./globals.css";
import { zalandoSans } from "@/lib/fonts";
import { ThemeProvider, useTheme } from "@/app/ThemeContext";

export const metadata: Metadata = {
  title: "ConnectFit - Your Ideal Trainer Hub",
  description:
    "Your Ideal Trainer Hub - Create workouts, track progress, and inspire your clients - all in one app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider>
        <body
          className={
            "p-4 pb-12 md:p-8 md:pb-8 min-h-dvh bg-light-primary dark:bg-slate-950  " +
            `${zalandoSans.className} `
          }
        >
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
