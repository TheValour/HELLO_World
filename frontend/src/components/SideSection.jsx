import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SideSection() {
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
      const response = await axios.get(`http://localhost:3000/taglist`);
      console.log(response.data.listResponse)
      setTags(response.data.listResponse);
    }
    fetchlistData();
  }, []);

  const tagList = tags.map((ele) => (
    <Link key={ele._id} to={`/article?cat=${ele.title}`} 
      className='bg-gray-100 h-8 m-4 p-2'
    >
      {ele.title}
    </Link>
  ));

  return (
    <div className='w-1/3 mt-3'>
      <div className='bg-blue-100 p-4 h-screen w-full sticky top-0'>
        <input type="text" name="" id="" className='h-8 'value={searchTag} 
          onChange={(e) => setSearchTag(e.target.value)} onKeyDown={onKeyPress} 
        />
        <span className=' text-white p-2 bg-gray-400  cursor-pointer' onClick={onClickHandler}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />  
        </span>       
        <br/><br/>
        {tagList}
      </div>
    </div>
  )
}
