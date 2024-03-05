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
    <section className="container h-full flex flex-col">
      <div className="flex justify-between px-10 py-6 border-b-2 border-black">
        <h4 className="border border-black">
          Welcome Back, {session.user.name}
        </h4>
        <p className="border border-black">search bar component</p>
      </div>
      <div className="flex-grow">
        <TicketContainer tickets={tickets} />
      </div>
    </section>
  );
};

export default DashBoard;
