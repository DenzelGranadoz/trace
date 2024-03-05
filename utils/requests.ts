import { NextResponse } from 'next/server';
import { getSession } from './session';

export const getTickets = async (): Promise<any> => {
  try {
    const session = await getSession();
    const { email } = session.user;

    const res = await fetch(
      `http://localhost:3000/api/Tickets/?email=${email}`,
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch tickets');
    }

    return res.json();
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching tickets' },
      { status: 500 }
    );
  }
};

export const getTicketById = async (id: string): Promise<any> => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Ticket not found');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching ticket by ID:', error);
    return NextResponse.json(
      { message: 'Error fetching ticket by ID' },
      { status: 500 }
    );
  }
};
