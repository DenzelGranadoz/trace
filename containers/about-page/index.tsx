import React from 'react';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

const AboutSection = async () => {
  const session = getServerSession(options);

  return (
    <section className="rounded-md bg-text-100 border border-black w-full h-full flex flex-col justify-center items-center">
      {!session && (
        <div className="h-1/6 w-full flex justify-center items-center flex-col gap-4 border-b-2 border-bg-300">
          <p className="text-xl">Log In / Register to access all features</p>
        </div>
      )}
      <div className="flex-grow w-full">
        <h1 className="text-5xl p-4 md:text-7xl md:p-[2rem] text-center">
          Welcome to Trace
        </h1>
        <div className="px-4 md:px-24 flex flex-col gap-10">
          <h3 className="text-center italic font-light">
            Trace is a to-do ticketing app
          </h3>
          <div>
            <p className="text-2xl">
              To be well organized and productive, having a to-do list will
              ensure that:
            </p>
            <ul className="list-disc">
              <li className="ml-6">
                You remember to carry out all necessary tasks.
              </li>
              <li className="ml-6">
                You tackle the most important jobs first, and don't waste time
                on trivial tasks.
              </li>
              <li className="ml-6">
                You don't get stressed by a large number of unimportant jobs.
              </li>
            </ul>
            <p>
              Start by listing all of the tasks as a ticket that you must carry
              out. Mark the importance of the task next to it, with a priority
              from High (very important) to Low (unimportant).{' '}
            </p>
            <p>
              Carry out the jobs at the top of the list first. These are the
              most important, most beneficial tasks to complete.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
