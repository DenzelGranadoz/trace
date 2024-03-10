import { useQuery } from '@tanstack/react-query';
import { TicketDetails } from '@/types/TicketDetails';

export const fetchTickets = async ({ email }: { email: string }) => {
  const res = await fetch(`/api/Tickets/?email=${email}`);

  if (!res.ok) {
    throw new Error('Failed to fetch Tickets');
  }

  const data = await res.json();
  const tickets: TicketDetails[] = data.tickets;

  return tickets;
};

export const useTickets = (email: string) => {
  const result = useQuery({
    queryKey: ['tickets', email],
    queryFn: () => fetchTickets({ email }),
  });
  return result;
};
