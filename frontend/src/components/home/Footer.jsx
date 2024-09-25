import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope  } from '@fortawesome/free-solid-svg-icons';


export default function Footer() {
  return (
    <div className='w-full bg-gray-200 FLEX mt-16 p-5 flex-col'>
        <span>© 2024 The Valour ❣️ </span>
        <div >
            <FontAwesomeIcon icon={faGithub} className='mr-4'/> 
            <FontAwesomeIcon icon={faEnvelope} />       
        </div>
    </div>
  )
}
