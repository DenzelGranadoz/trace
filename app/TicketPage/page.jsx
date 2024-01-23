import React from 'react';
import TicketCard from '../(components)/TicketCard';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

const getTickets = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/Login?callbackUrl=/TicketPage');
  }
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
    console.log('Failed to get tickets', error);
  }
};

const DashBoard = async () => {
  const data = await getTickets();
  const tickets = data.tickets;

  // if (tickets.length < 1) {
  //   return <p>Click on the Ticket Icon and create a ticket to get started</p>;
  // }

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  console.log(tickets.sort((a, b) => b.priority - a.priority));

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((category, idx) => (
            <div key={idx} className="mb-4">
              <h2>{category}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === category)
                  .sort((a, b) => b.priority - a.priority)
                  .map((filteredTicket, _idx) => (
                    <TicketCard id={_idx} key={_idx} ticket={filteredTicket} />
                  ))}
              </div>
            </div>
          ))}
        <Link href="/TicketPage/new">
          {/* <FontAwesomeIcon icon={faPlusCircle} className="icon"/> */}
          <button className="btn no-underline">Add new Ticket</button>
        </Link>
      </div>
    </div>
  );
};

export default DashBoard;
