import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import AppThemeProvider from './ThemeProvider';

const inter = Inter({subsets: ['latin']});

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
      <body className={inter.className}>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
