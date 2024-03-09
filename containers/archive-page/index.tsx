import TicketContainer from '@/components/Tickets/TicketContainer';
import { TicketDetails } from '@/types/TicketDetails';
import { getTickets } from '@/utils/requests';

const ArchiveContainer = async ({}) => {
  const data = await getTickets();
  const tickets: TicketDetails[] = data.tickets || [];
  const archivedTickets = tickets.filter((ticket) => !ticket.active);

  return (
    <section className="rounded-xl bg-text-100 w-full h-full">
      <div className="flex justify-center px-10 py-6 border-b-2 border-text-200">
        <h4 className="">Archived Tickets</h4>
      </div>
      {archivedTickets.length > 0 ? (
        <TicketContainer tickets={archivedTickets} />
      ) : (
        <h1 className="text-center mt-5">
          Proceed to Ticket Page to add Ticket(s)
        </h1>
      )}
    </section>
  );
};

export default ArchiveContainer;
