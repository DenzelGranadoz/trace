'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import DeleteBlock from '@/components/DeleteBlock';

import { TicketDetails } from '@/types/TicketDetails';
import { LuArchive } from 'react-icons/lu';

interface TicketFormProps {
  ticket: TicketDetails;
  editEnabled: boolean;
}

const TicketForm: React.FC<TicketFormProps> = ({ ticket, editEnabled }) => {
  const router = useRouter();
  const {
    title,
    description,
    dateFrom,
    dateTo,
    priority,
    status,
    email,
    active,
  } = ticket;

  const formTicketData = {
    title,
    description,
    dateFrom,
    dateTo,
    priority,
    status,
    email,
    active,
  };

  const [formData, setFormData] = useState(formTicketData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editEnabled) {
      await updateTicket();
    } else {
      await createTicket();
    }

    router.push('/');
    router.refresh();
  };

  const updateTicket = async () => {
    const res = await fetch(`/api/Tickets/${ticket._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    });
    if (!res.ok) {
      throw new Error('Failed to update Ticket.');
    }
  };

  const createTicket = async () => {
    const res = await fetch('/api/Tickets', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    });
    if (!res.ok) {
      throw new Error('Failed to create Ticket.');
    }
  };

  const archiveTicket = async () => {
    const res = await fetch(`/api/Tickets/${ticket._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ formData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to archive Ticket');
    }

    router.push('/Archive');
    router.refresh();
  };

  return (
    <form
      className="w-2/5 flex justify-center align-center flex-col border border-black"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full justify-between items-center mb-2">
        <h3>{editEnabled ? 'Update Ticket' : 'Create Ticket'}</h3>

        {editEnabled && <DeleteBlock id={ticket._id} />}
      </div>
      <label>Title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={handleChange}
        required={true}
        value={formData.title}
        maxLength={10}
      />
      <label>Description</label>
      <textarea
        id="description"
        name="description"
        onChange={handleChange}
        required={true}
        value={formData.description}
        maxLength={120}
      />
      <div className="flex w-full">
        <div className="flex-1 my-2">
          <label>Start Date</label>
          <DatePicker
            // showIcon
            selected={formData.dateFrom}
            onChange={(date) =>
              setFormData((prevState) => ({
                ...prevState,
                dateFrom: date,
              }))
            }
            selectsStart
            startDate={formData.dateFrom}
            endDate={formData.dateTo}
          />
        </div>
        <div className="flex-1 my-2">
          <label>End Date</label>
          <DatePicker
            // showIcon
            selected={formData.dateTo}
            onChange={(date) =>
              setFormData((prevState) => ({
                ...prevState,
                dateTo: date,
              }))
            }
            selectsEnd
            startDate={formData.dateFrom}
            endDate={formData.dateTo}
            minDate={formData.dateFrom}
          />
        </div>
      </div>
      <label>Priority</label>
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      {editEnabled && (
        <>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Todo">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </>
      )}
      <input
        type="submit"
        className="btn "
        value={editEnabled ? 'Update Ticket' : 'Create Ticket'}
      />
      {formData.status === 'Completed' && (
        <div className="hover: cursor-pointer">
          <LuArchive size={30} color="black" onClick={archiveTicket} />
        </div>
      )}
    </form>
  );
};

export default TicketForm;
