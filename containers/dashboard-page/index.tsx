import React from 'react';

import TicketContainer from '@/components/Tickets/TicketContainer';

import { getTickets } from '@/utils/requests';
import { getSession } from '@/utils/session';

import { TicketDetails } from '@/types/TicketDetails';

const DashBoard = async () => {
  const session = await getSession();
  const data = await getTickets();
  const tickets: TicketDetails[] = data.tickets || [];

  return (
    <section className="rounded-xl bg-text-100 w-full h-full flex flex-col">
      <div className="flex justify-between px-10 py-6 border-b-2 border-text-200">
        <h4 className="">Hi {session.user.name}, welcome back</h4>
        <p className="border border-black">search bar component</p>
      </div>
      <div className="flex-grow">
        {tickets.length > 0 ? (
          <TicketContainer tickets={tickets} />
        ) : (
          <h1 className="text-center mt-5">
            Proceed to Ticket Page to add Ticket(s)
          </h1>
        )}
      </div>
    </section>
  );
};

export default DashBoard;
