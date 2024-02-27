import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function SideSection() {
  const [tags, setTags] = useState([]);
  function onClickHandler(e) {
    console.log("Helo")
    console.log(e.target.value)
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
        <input type="text" name="" id="" className='h-8 ' onClick={onClickHandler}/><span>-&gt;</span><br/><br/>
        {tagList}
      </div>
    </div>
  )
}
