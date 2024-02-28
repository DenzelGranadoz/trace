import React from 'react';

const AboutSection = () => {
  return (
    <section className='flex-grow rounded-xl border border-black bg-text-100 h-full flex flex-col justify-center items-center'>
      <div className='h-1/5 w-full flex justify-center items-center flex-col gap-4 border-b-2 border-bg-300'>
        <p className='text-xl'>Log In / Register to access all features</p>
      </div>
      <div className='flex-grow w-full'>
        <h1 className='text-7xl p-[2rem] text-center'>Welcome to Trace</h1>
        <div className='px-24 flex flex-col gap-10'>
          <h3>Trace is a to-do ticketing app</h3>
          <div>
            <p>
              To be well organized and productive, having a to-do list will
              ensure that:
            </p>
            <ul className='list-disc'>
              <li className='ml-6'>
                You remember to carry out all necessary tasks.
              </li>
              <li className='ml-6'>
                You tackle the most important jobs first, and don't waste time
                on trivial tasks.
              </li>
              <li className='ml-6'>
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
