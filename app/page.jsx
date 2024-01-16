import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket, faUserClock } from '@fortawesome/free-solid-svg-icons'


const HomePage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <div className="border-white border-2 w-4/5 h-3/4 rounded-2xl p-8 flex flex-col">
        <div className=" flex-2 text-center p-2 mb-5">
          <h1>Trace</h1>
          <h3>To-Do ticketing system with pomodoro</h3>
        </div>
        <div className='flex-1.5 justify-around flex  h-full'>
          
          <div className="border-white border flex-1 m-1 rounded-md hover:opacity-70">
          <Link href="/TicketPage">

            <h3>Ticketing Page</h3>
            <p>Go to a page where you can track your tickets or to-do items</p>
              <FontAwesomeIcon icon={faTicket} className="icon text-8xl" />
            </Link>
          </div>
          <div className="border-white border flex-1 m-1 rounded-md hover:opacity-70">
            <Link href="/PomodoroPage">
              <h3>Pomodoro ....</h3>
              <p>Go to a page where you can be productive with the help of pomodoro, Tickets can be linked with pomodoro</p>
              <FontAwesomeIcon icon={faUserClock} className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// redirect page component
// info page component

export default HomePage