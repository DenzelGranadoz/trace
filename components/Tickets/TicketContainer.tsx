import React from 'react';

import Ticket from './TicketCard';

import { TicketDetails } from '@/types/TicketDetails';

interface TicketContainerProps {
  tickets: TicketDetails[];
}

const TicketContainer: React.FC<TicketContainerProps> = ({ tickets }) => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 p-6 gap-6">
      {tickets.map((ticket) => (
        <Ticket
          key={ticket._id}
          id={ticket._id}
          title={ticket.title}
          dateFrom={ticket.dateFrom}
          dateTo={ticket.dateTo}
          description={ticket.description}
          status={ticket.status}
          priority={ticket.priority}
          active={ticket.active}
        />
      ))}
    </div>
  );
};

export default TicketContainer;
