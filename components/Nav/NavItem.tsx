import Link from 'next/link';
import React from 'react';

import { MdOutlineDashboard } from 'react-icons/md';
import { CiReceipt } from 'react-icons/ci';
import { LuArchive } from 'react-icons/lu';
import { RiHome2Line } from 'react-icons/ri';

import { IoLogInOutline } from 'react-icons/io5';
// <IoLogInOutline />;
import { IoLogOutOutline } from 'react-icons/io5';
// <IoLogOutOutline />

interface NavItemProps {
  href: string;
  // icon: string;
  index: number;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, index, label }) => {
  return (
    <Link href={href}>
      <div className="flex items-center hover:bg-green-accent px-2 rounded-md bg-bg-300">
        {index === 0 ? (
          <MdOutlineDashboard size={30} color="white" />
        ) : index === 1 ? (
          <CiReceipt size={30} color="white" />
        ) : index === 2 ? (
          <LuArchive size={30} color="white" />
        ) : index === 3 ? (
          <RiHome2Line size={30} color="white" />
        ) : index === 4 ? (
          <IoLogInOutline size={30} color="white" />
        ) : (
          <IoLogOutOutline size={30} color="white" />
        )}
        <h4 className="text-white flex-grow p-3 font-normal text-lg">
          {label}
        </h4>
      </div>
    </Link>
  );
};

export default NavItem;
