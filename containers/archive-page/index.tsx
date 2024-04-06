'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import TicketContainer from '@/components/Tickets/TicketContainer';

import { useTickets } from '@/utils/tickets.api';

const ArchiveContainer = () => {
  const { status: sessionStatus, data: session } = useSession();

  useEffect(() => {
    if (sessionStatus != 'authenticated') {
      redirect('/About');
    }
  }, [sessionStatus]);

  const { isLoading, error, data } = useTickets(session?.user?.email);

  if (error) {
    return (
      <h1>
        There has been an error fetching your tickets from the server, please
        try again later
      </h1>
    );
  }

  const archivedTickets = isLoading
    ? []
    : data.filter((ticket) => !ticket.active);

  return (
    <section className="rounded-xl bg-text-100 w-full h-full overflow-auto">
      <div className="flex justify-center px-10 py-6 border-b-2 border-text-200">
        <h4 className="">Archived Tickets</h4>
      </div>
      {isLoading ? (
        <h1>Fetching Tickets</h1>
      ) : (
        <>
          {archivedTickets.length > 0 ? (
            <TicketContainer tickets={archivedTickets} />
          ) : (
            <h1 className="text-center mt-5">
              Proceed to Ticket Page to add Ticket(s)
            </h1>
          )}
        </>
      )}
    </section>
  );
};

export default ArchiveContainer;
