import React from 'react';

import NavItem from './NavItem';
import { sideBarDetails } from './constants';

import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = async ({}) => {
  const { heading, navs } = sideBarDetails;
  const session = await getServerSession(options);
  return (
    <section className="h-full w-1/4 flex flex-col justify-between pr-8">
      <div className="flex flex-col gap-16">
        <h1 className=" text-white">{heading}</h1>
        <div className="flex flex-col gap-3">
          {navs.map((navItem, i) => (
            <NavItem
              key={navItem.id}
              href={navItem.href}
              // icon={navItem.icon}
              index={i}
              label={navItem.label}
            />
          ))}
        </div>
      </div>

      <div>
        {session ? (
          <NavItem
            href="/Logout"
            // icon={navItem.icon}
            index={5}
            label="Log out"
          />
        ) : (
          <NavItem
            href="/Login"
            // icon={navItem.icon}
            index={4}
            label="Log in"
          />
        )}
      </div>
    </section>
  );
};

export default SideBar;
