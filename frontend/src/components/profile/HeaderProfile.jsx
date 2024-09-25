import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function HeaderProfile() {
  const navigate = useNavigate();
  
  return (
    <div  className="navbar-container px-16 py-4 border-r flex justify-evenly flex-col">
      <span className='text-4xl bg-white p-3 rounded-full'>
        <FontAwesomeIcon icon={faUser} />
      </span>
      <div className='flex flex-col text-center'>
        <Link to='/'>
          <span className='font-semibold'>MKDIR</span>
        </Link>
        <span className='text-xs font-normal text-blue-700'>a rich text editor</span>
      </div>
    </div>
  )
}
