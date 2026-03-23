import { Zalando_Sans, Zalando_Sans_Expanded } from 'next/font/google'

export const zalandoSansExpanded = Zalando_Sans_Expanded({
  variable: "--font-zalando-sans-expanded",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['sans-serif'],
});

export const zalandoSans = Zalando_Sans({
  variable: "--font-zalando-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['sans-serif'],
});