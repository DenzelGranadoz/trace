import React from 'react';

import TicketForm from '@/components/Tickets/TicketForm';

import { TicketDetails } from '@/types/TicketDetails';
import { getTicketById } from '@/utils/requests';
import { getSession } from '@/utils/session';

interface TicketPageProps {
  params: {
    id: string;
  };
}

const TicketPageSection: React.FC<TicketPageProps> = async ({ params }) => {
  let ticketData: TicketDetails | null = null;
  const session = await getSession();
  const editEnabled = params.id === 'new' ? false : true;

  if (editEnabled) {
    const res = await getTicketById(params.id);
    ticketData = res.foundTicket;
  } else {
    ticketData = {
      _id: 'new',
      title: '',
      description: '',
      dateFrom: new Date(),
      dateTo: new Date(),
      priority: 'Low',
      status: 'Todo',
      email: session?.user?.email,
    };
  }

  return (
    <section className="rounded-xl w-full h-full bg-text-100 flex justify-center items-center">
      <TicketForm ticket={ticketData} editEnabled={editEnabled} />
    </section>
  );
};

export default TicketPageSection;
