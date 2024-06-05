import type {Metadata} from 'next';
import {Marhey} from 'next/font/google';
import './globals.css';
import AppThemeProvider from './ThemeProvider';

const marhey = Marhey({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tic Tac Toe',
  description: 'Tic tac toe game developed by Lakan Santos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={marhey.className}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
