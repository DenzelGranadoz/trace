import '../styles/globals.css';
import { Lato } from 'next/font/google';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import AuthProvider from '../components/AuthProvider';
import SideBar from '../components/Nav/SideBar';

config.autoAddCss = false;

const inter = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata = {
  title: 'Trace',
  description: 'Trace App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} flex h-screen w-screen p-8`}>
          <SideBar />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
