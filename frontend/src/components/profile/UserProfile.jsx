import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../context/AuthContext';
import { APIContext } from '../../context/api';
import Spinner from '../util/Spinner';
import Element from './Element';
import HeaderProfile from './HeaderProfile';

export default function UserProfile() {
  const { user, setUser } = useContext(AuthContext);
  const { verifyUser } = useContext(APIContext);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await verifyUser();
        const { status, user } = data;
        if (status && isMounted) {
          setUser(user);
        }
        // console.log(user)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if(!user) {
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

  return (
    <div className='w-screen h-5/6 flex bg-gray-50 justify-center'>
      <HeaderProfile/>
      <div className='pt-16 bg-white p-6 min-w-96'>
        <div className='flex flex-row justify-between items-center'>
          <div>
            <span className='font-bold'>{user.username}</span><br/>
            <span className='text-blue-800'>{user.email}</span><br/><br/>
          </div>
          <span className='text-4xl'>
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>
        <Element list={user.articleList}/>
      </div>
    </div>
  );
}
