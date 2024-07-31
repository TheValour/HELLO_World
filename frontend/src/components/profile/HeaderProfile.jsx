import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function HeaderProfile() {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem('token');
    setUser(null)
    navigate("/");
  };

  return (
    <div  className="navbar-container px-16 py-4 bg-slate-200 flex justify-evenly flex-col">
      <span className='text-4xl bg-white p-3 rounded-full'>
        <FontAwesomeIcon icon={faUser} />
      </span>
      <div className='flex flex-col text-center'>
        <Link to='/'>
          <span className='font-semibold'>MKDIR</span>
        </Link>
        <span className='text-xs font-normal text-blue-700'>a rich text editor</span>
      </div>
      <div> 
        <span className='text-blue-700' >
          <button onClick={Logout}
            className='ml-4 border border-white bg-gray-700 text-white text-xs p-2 rounded-md'>
            Logout
          </button>
        </span>
      </div>
    </div>
  )
}
