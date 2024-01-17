import Ticket from '@/app/(models)/Ticket';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const ticketData = body.formData;

    await Ticket.create(ticketData);

    return NextResponse.json({ message: 'Ticket Created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}

export async function GET(req) {
  const queryParams = new URLSearchParams(req.url.split('?')[1]);
  const email = queryParams.get('email');

  if (!email) {
    return NextResponse.json(
      { message: 'You are not loggied in' },
      { status: 400 }
    );
  }

  try {
    const tickets = await Ticket.find({ email: email });
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  }
}
