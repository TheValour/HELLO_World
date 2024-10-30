import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { APIContext } from '../../context/api';

export default function SideSection() {
  const {getAdminTagList} = useContext(APIContext);
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [searchTag, setSearchTag] = useState("");

  function onKeyPress(e) {
    if(e.key === 'Enter' && searchTag){
      navigate(`/article?cat=${searchTag}`)
      setSearchTag("");
    }
  }
  function onClickHandler() {
    if(searchTag) {
      navigate(`/article?cat=${searchTag}`)
      setSearchTag("");
    }
  }

  useEffect(() => {
    async function fetchlistData(){
      // backend call
      const response = await getAdminTagList();
      // console.log(response.data.listResponse)
      setTags(response.data.listResponse);
    }
    fetchlistData();
  }, []);

  const tagList = tags.map((ele) => (
    <span key={ele._id} className='mb-2'>
      <Link  to={`/article?cat=${ele.title}`} 
        className='bg-yellow-200 px-3 p-1 rounded-md'
        >
        {ele.title}
      </Link>
    </span>
  ));

  return (
    <div className='w-1/5 mt-3'>
      <div className='bg-blue-100 p-4 h-full w-full sticky top-0'>
        <div className='mb-5 FLEX'>
          <input type="text" name="" id="" className='h-7 w-3/4 pl-2' value={searchTag} 
            onChange={(e) => setSearchTag(e.target.value)} onKeyDown={onKeyPress} 
            />
          <span className=' text-white p-1 bg-gray-400  cursor-pointer h-7' onClick={onClickHandler}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>  
          </span>       
        </div>
        <div id='tagList' className='w-full FLEX  flex-wrap gap-2'>
          {tagList}
        </div>
      </div>
    </div>
  )
}
