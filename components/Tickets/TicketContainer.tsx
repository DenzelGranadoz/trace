import React from 'react';

import Ticket from './TicketCard';

import { TicketDetails } from '@/types/TicketDetails';

interface TicketContainerProps {
  tickets: TicketDetails[];
}

const TicketContainer: React.FC<TicketContainerProps> = ({ tickets }) => {
  return (
    <div className="grid grid-cols-3 p-6 gap-6">
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
        />
      ))}
    </div>
  );
};

export default TicketContainer;
