import { Zalando_Sans, Zalando_Sans_Expanded, Syne } from 'next/font/google'

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

export const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  // Syne — это вариативный шрифт, но можно указать веса явно, если нужно
  weight: ['400', '500', '600', '700', '800'], 
  variable: '--font-syne', // Создаем CSS-переменную для использования в Tailwind или CSS
});