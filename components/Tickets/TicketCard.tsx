import React from 'react';
import StatusCard from './StatusCard';
import { formatTimestamp } from '@/utils/dateFormat';
import Link from 'next/link';

interface TicketProps {
  id: string;
  title: string;
  dateFrom: Date;
  dateTo: Date;
  description: string;
  status: string;
  priority: string;
}

const Ticket: React.FC<TicketProps> = ({
  id,
  title,
  dateFrom,
  dateTo,
  description,
  status,
  priority,
}) => {
  return (
    <Link href={`/TicketPage/${id}`}>
      <div className="flex flex-col align-center justify-between border-2 border-text-200 opacity-85 hover:border-text-100 hover:bg-text-200 min-h-64 rounded-md px-4 py-2 shadow-xl">
        <div className="flex justify-between items-center">
          <h4 className="flex-1">{title}</h4>
          <p>
            {formatTimestamp(dateFrom)} - {formatTimestamp(dateTo)}
          </p>
        </div>
        <div className="flex-grow flex justify-center items-center text-center">
          <p>{description}</p>
        </div>
        <div className="flex justify-end gap-4">
          <StatusCard type="status" label={status} />
          <StatusCard type="priority" label={priority} />
        </div>
      </div>
    </Link>
  );
};

export default Ticket;
