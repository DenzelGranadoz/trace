'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const TicketForm = ({ ticket, session }) => {
  const EDITMODE = ticket._id === 'new' ? false : true;
  const router = useRouter();

  const startingTicketData = {
    title: '',
    description: '',
    priority: 1,
    status: 'not started',
    email: session?.user?.email,
    category: 'Study',
  };

  if (EDITMODE) {
    startingTicketData['title'] = ticket.title;
    startingTicketData['description'] = ticket.description;
    startingTicketData['priority'] = ticket.priority;
    startingTicketData['status'] = ticket.status;
    startingTicketData['category'] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);

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

    if (EDITMODE) {
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
    } else {
      const res = await fetch('/api/Tickets', {
        method: 'POST',
        body: JSON.stringify({ formData }),
        'Content-Type': 'application/json',
      });

      if (!res.ok) {
        throw new Error('Failed to create Ticket.');
      }
    }
    router.push('/TicketPage');
    router.refresh();
  };

  return (
    <div className='flex justify-center'>
      <form
        className='flex flex-col gap-3 w-1/2'
        method='post'
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? 'Update Your Ticket' : 'Create Your Ticket'}</h3>
        <label>Title</label>
        <input
          id='title'
          name='title'
          type='text'
          onChange={handleChange}
          required={true}
          value={formData.title}
        />

        <label>Description</label>
        <textarea
          id='description'
          name='description'
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows='5'
        />

        <label>Category</label>
        <select
          name='category'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='study'>Study</option>
          <option value='work'>Work</option>
          <option value='chores'>Chores</option>
          <option value='others'>Others</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id='priority-1'
            name='priority'
            type='radio'
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>Low</label>
          <input
            id='priority-2'
            name='priority'
            type='radio'
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>Medium</label>
          <input
            id='priority-3'
            name='priority'
            type='radio'
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>High</label>
        </div>
        {EDITMODE && (
          <div>
            <label>Status</label>
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
            >
              <option value='to do'>To Do</option>
              <option value='in progress'>In Progress</option>
              <option value='done'>Done</option>
            </select>
          </div>
        )}
        <input
          type='submit'
          className='btn max-w-xs'
          value={EDITMODE ? 'Update Ticket' : 'Create Ticket'}
        />
      </form>
    </div>
  );
};

export default TicketForm;
