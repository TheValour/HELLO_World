import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function EditorHeader({onClickHandler}) {
    const {user} = useContext(AuthContext)
  return (
    <div className='flex  justify-between items-center px-8 py-2 w-11/12'>
        <span>ATG World</span>
        <span>
            <button className="bg-green-300 p-2 mx-4 rounded-2xl text-gray-600 text-sm" 
                onClick={onClickHandler}
                >
                Publish
            </button> 
            <span>{user ? user.username : ""}</span>   
        </span>
    </div>
  )
}
