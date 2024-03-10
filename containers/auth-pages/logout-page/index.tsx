'use client';
import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';

const LogoutSection = () => {
  const router = useRouter();

  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus !== 'authenticated') {
      router.push('/');
      router.refresh();
    }
  }, [sessionStatus, router]);

  return (
    <section className="rounded-xl w-full bg-text-100 flex justify-center items-center">
      <div className="p-6 border border-text-200 shadow-inner rounded-md">
        <h2 className="my-4">Click on the button to logout</h2>
        <div>
          <button
            onClick={() => {
              signOut();
            }}
            className="btn"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogoutSection;
