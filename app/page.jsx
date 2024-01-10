import React from "react";
import TicketCard from "./(components)/TicketCard";
import Ticket from "./(models)/Ticket";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

const DashBoard = async () => {
  const data = await getTickets();
  const tickets = data.tickets;

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

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
                  .map((filteredTicket, _idx) => (
                    <TicketCard id={_idx} key={_idx} ticket={filteredTicket} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashBoard;
