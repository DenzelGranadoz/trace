import '../styles/globals.css';
import { Lato } from 'next/font/google';

import SideBar from '@/components/Nav/SideBar';
import AuthProvider from '@/lib/providers/AuthProvider';
import QueryProvider from '@/lib/providers/QueryProvider';

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
        <QueryProvider>
          <body
            className={`${inter.className} flex flex-col md:flex-row h-screen w-screen p-8`}
          >
            <SideBar />
            {children}
          </body>
        </QueryProvider>
      </AuthProvider>
    </html>
  );
}
