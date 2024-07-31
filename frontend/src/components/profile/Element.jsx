import React, { useContext, useEffect, useState } from 'react'
import { APIContext } from '../../context/api';
import Atom from './Atom';
import Spinner from '../util/Spinner';

export default function Element({list}) {
  const { getArticleById } = useContext(APIContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (id) => {
      try {
        const response = await getArticleById(id);
        const { success, item } = response;
          if (success && isMounted) {
            setData(pre => [...pre, item.postResponse]);
          }
      } catch (error) {
        console.log(error);
      }
    };
    
    list.forEach(fetchData);

    return () => {
      isMounted = false;
    };
  }, []);

  if(data.size < list.size) {
    return (
      <Spinner
      message="Logging In"
      height={30}
      width={150}
      color="#ffffff"
      messageColor="#fff"
      />
    )
  }

  data.forEach(ele => console.log(ele))
  let article = data.map((ele) => <Atom data={ele}/>)
  if(article.length === 0) {
    article = <div className='text-gray-500 text-sm mt-3'>No article Present...</div>
  }

  return (
    <div>
      <h2 className='underline text-green-600'>Article List</h2>
      {article}
    </div>
  )
}
