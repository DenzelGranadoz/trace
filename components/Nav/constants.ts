import { SideBarDetail } from '../../types/SideBarDetail';

export const sideBarDetails: SideBarDetail = {
  heading: 'Trace',
  navs: [
    {
      id: 1,
      label: 'DashBoard',
      href: '/',
    },
    {
      id: 2,
      // icon: <ArchiveBoxIcon className="h-7 w-7 text-text-200" />,
      href: '/TicketPage/new',
      label: 'Ticket Page',
    },
    {
      id: 3,
      // icon: <ArchiveBoxIcon className="h-7 w-7 text-text-200" />,
      href: '/Archive',
      label: 'Archive',
    },
    {
      id: 4,
      // icon: 'ArchiveBoxIcon',
      href: '/About',
      label: 'About',
    },
  ],
};
