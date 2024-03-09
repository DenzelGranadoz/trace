export type TicketDetails = {
  _id: string;
  title: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  priority: string;
  status: string;
  email: string;
  active?: Boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
