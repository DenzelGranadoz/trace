import Nav from './(components)/Nav';
import './globals.css';
import { Lato } from 'next/font/google';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import AuthProvider from './(components)/AuthProvider';

config.autoAddCss = false;

const inter = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata = {
  title: 'Trace',
  description: 'Trace App - Next JS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="flex flex-col h-screen max-h-screen">
            <Nav />
            <div className="flex-grow overflow-y-auto bg-page text-default-text">
              {children}
            </div>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
