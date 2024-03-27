'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

import NavItem from './NavItem';
import { sideBarDetails } from './constants';
import useMediaQuery from '@/lib/hooks/useMediaQuery';

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = ({}) => {
  const { data: session } = useSession();
  const { heading, navs } = sideBarDetails;

  const isNotWide = useMediaQuery(768);

  return (
    <section className="md:h-full w-full md:w-1/4 flex md:flex-col justify-between md:pr-8">
      {isNotWide ? (
        <div className="w-full flex justify-around mb-6">
          {navs.map((navItem, i) => (
            <NavItem
              key={navItem.id}
              href={navItem.href}
              // icon={navItem.icon}
              index={i}
            />
          ))}
          {session ? (
            <NavItem
              href="/Logout"
              // icon={navItem.icon}
              index={5}
            />
          ) : (
            <NavItem
              href="/Login"
              // icon={navItem.icon}
              index={4}
            />
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-16">
            {heading && <h1 className=" text-white">{heading}</h1>}
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
        </>
      )}
    </section>
  );
};

export default SideBar;
