import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faTicket,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <nav className='flex justify-between bg-nav p-4'>
      <div className='flex items-center space-x-4'>
        <Link href='/'>
          <FontAwesomeIcon icon={faHome} className='icon' />
        </Link>
        <Link href='/TicketPage'>
          <FontAwesomeIcon icon={faTicket} className='icon' />
        </Link>
        <Link href='/PomodoroPage'>
          <FontAwesomeIcon icon={faUserClock} className='icon' />
        </Link>
      </div>
      <div>
        {session ? (
          <Link href='/api/auth/signout?callbackUrl=/' className='text-white'>
            Logout
          </Link>
        ) : (
          <Link href='/Login' className='text-white'>
            Login
          </Link>
        )}
        {session && <p className='text-default-text'>{session.user.email}</p>}
      </div>
    </nav>
  );
};

export default Nav;
