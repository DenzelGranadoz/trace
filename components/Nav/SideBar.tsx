import React from 'react';

import NavItem from './NavItem';
import { sideBarDetails } from './constants';

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = ({}) => {
  const { heading, navs } = sideBarDetails;
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
        <NavItem
          href="/Login"
          // icon={navItem.icon}
          index={4}
          label="Log in"
        />
      </div>
    </section>
  );
};

export default SideBar;
