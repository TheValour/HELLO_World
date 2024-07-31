import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../context/AuthContext'
import { APIContext } from '../context/api'

export default function UserProfile() {
    const {user, setUser} = useContext(AuthContext)
    const {verifyUser} = useContext(APIContext);

    useEffect(() => {
        const fetchData = async () => {
          try {
            if(!user) {
                const data = await verifyUser();
                const { status, user } = data;
                console.log(data)
                if (status) {
                  if (!isMounted) {
                    return;
                  }
                  console.log()
                  setUser(user);
                  setTimeout(() => {
                    navigate("/");
                  }, 1000);
                }
            }
            console.log(user)
          } catch (error) {
            console.log(error);
          }
        };
        let isMounted = true;
        fetchData();
    
        return () => {
          isMounted = false;
        };
    }, []);

  return (
    <div className='w-screen h-screen flex justify-center'>
        <div className='FLEX flex-col'>
            <span className='text-4xl'>
                <FontAwesomeIcon icon={faUser}  />
            </span>
            <span> {user ? user.username:''} </span>
            <span> {user ? user.email:''} </span>
        </div>
    </div>
  )
}
