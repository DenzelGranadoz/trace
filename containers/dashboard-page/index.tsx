'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import TicketContainer from '@/components/Tickets/TicketContainer';
import InputField from '@/components/InputField';

import { useTickets } from '@/utils/tickets.api';

const DashBoard = () => {
  const { status: sessionStatus, data: session } = useSession();

  useEffect(() => {
    if (sessionStatus != 'authenticated') {
      redirect('/About');
    }
  }, [sessionStatus]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFiltered, setSearchFiltered] = useState([]);

  const { isLoading, error, data } = useTickets(session?.user?.email);

  if (error) {
    return (
      <h1>
        There has been an error fetching your tickets from the server, please
        try again later
      </h1>
    );
  }

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredTickets = activeTickets.filter((ticket) =>
      ticket.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchFiltered(filteredTickets);
  };

  const activeTickets = isLoading ? [] : data.filter((ticket) => ticket.active);

  return (
    <section className="rounded-xl bg-text-100 w-full h-full flex flex-col overflow-auto">
      <div className="flex justify-between items-center px-10 py-6 border-b-2 border-text-200">
        <h4 className="flex-1 pr-4 ">Hi {session?.user?.name}, welcome back</h4>
        <InputField
          name="search"
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search Ticket Name"
        />
      </div>
      {isLoading ? (
        <h1>Fetching Tickets</h1>
      ) : (
        <div className="flex-grow">
          {searchQuery == '' ? (
            activeTickets.length > 0 ? (
              <TicketContainer tickets={activeTickets} />
            ) : (
              <h1 className="text-center mt-5">
                Proceed to Ticket Page to add Ticket(s)
              </h1>
            )
          ) : (
            <TicketContainer tickets={searchFiltered} />
          )}
        </div>
      )}
    </section>
  );
};

export default DashBoard;
