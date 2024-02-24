import React from 'react';
import NavItem from '../../components/Nav/NavItem';

const AboutSection = () => {
  return (
    <section className="flex-grow rounded-xl border border-black bg-text-100 h-full flex flex-col justify-center items-center">
      <div className="h-1/5 w-full flex justify-center items-center flex-col gap-4 border-b-2 border-bg-300">
        <p className="text-xl">Log In / Register to access all features</p>
        <div className="w-1/4">
          <NavItem href="/Login" icon="/icons/login.svg" label="Log in" />
        </div>
      </div>
      <div className="flex-grow">
        Whatever note about about{' '}
        <span className="text-red-500">***This is a todo***</span>
      </div>
    </section>
  );
};

export default AboutSection;
