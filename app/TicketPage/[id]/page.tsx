import TicketForm from '../../../components/TicketForm';
import { options } from '../../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import React from 'react';
import TicketPageSection from '@/containers/ticket-page';

const getTicketById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch topic');
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// interface foundTicket {
//   foundTicket: {
//     TicketDetails
//   }
// }

let updateTicketData = {};
const TicketPage = async ({ params }) => {
  // console.log('paramer', params);
  // const EDITMODE = params.id === 'new' ? false : true;
  // const session = await getServerSession(options);

  // if (EDITMODE) {
  //   updateTicketData = await getTicketById(params.id);
  //   updateTicketData = updateTicketData.foundTicket;
  // } else {
  //   updateTicketData = {
  //     _id: 'new',
  //   };
  // }
  // return <TicketForm ticket={updateTicketData} session={session} />;
  return <TicketPageSection params={params} />;
};

export default TicketPage;
