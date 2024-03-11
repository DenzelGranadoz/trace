import React from 'react';

import TicketPageSection from '@/containers/ticket-page';

const TicketPage = async ({ params }) => {
  return <TicketPageSection params={params} />;
};

export default TicketPage;
