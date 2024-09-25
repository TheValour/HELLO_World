import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import { QuillContext } from '../../context/QuillContext';
import { APIContext } from '../../context/api';

export default function UpdateArticle({id}) {
  // const [warn, setWarn] = useState(false);
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  const {UpdateArticleAPI} = useContext(APIContext);

  const { quill, setQuill} = useContext(QuillContext);

  async function onClickHandler () {
    const json = JSON.stringify(quill);
    await UpdateArticleAPI(id, json);
    setQuill('')
    navigate('/')
  }

  return (
    <div className='flex  justify-between items-center px-8 py-2 w-11/12'>
        <Link to='/'>
          MKDIR - <span className='text-blue-700 text-xs'>a blog app</span> 
        </Link>
        {/* {warn && <div className='text-xs text-red-400'>char count should be greater than 500</div>} */}
        <span>
            <button 
              className="bg-green-300 p-2 mx-4 rounded-2xl text-gray-600 text-sm"  
              onClick={onClickHandler}
            >
              Update
            </button> 
            <span>{user ? user.username : ""}</span>   
        </span>
    </div>
  )
}
