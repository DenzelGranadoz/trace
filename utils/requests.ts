import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { NextResponse } from 'next/server';

export const getTickets = async () => {
  const session = await getServerSession(options);
  try {
    const { email } = session.user;

    const res = await fetch(
      `http://localhost:3000/api/Tickets/?email=${email}`,
      {
        cache: 'no-store',
      }
    );

    return res.json();
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
};
