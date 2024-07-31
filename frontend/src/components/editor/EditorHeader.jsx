import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'

export default function EditorHeader({onClickHandler, flag}) {
  const [warn, setWarn] = useState(false);
  const {user} = useContext(AuthContext)


  return (
    <div className='flex  justify-between items-center px-8 py-2 w-11/12'>
        <Link to='/'>
          MKDIR - <span className='text-blue-700 text-xs'>a blog app</span> 
        </Link>
        {warn && flag && <div className='text-xs text-red-400'>char count should be greater than 500</div>}
        <span>
            <button 
              className="bg-green-300 p-2 mx-4 rounded-2xl text-gray-600 text-sm"  
              onClick={onClickHandler}
              disabled={flag}
              onMouseOver={() => setWarn(true)}
              onMouseOut={() => setWarn(false)}
            >
              Publish
            </button> 
            <span>{user ? user.username : ""}</span>   
        </span>
    </div>
  )
}
