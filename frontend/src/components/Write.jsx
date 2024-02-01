import React, { useEffect } from 'react';
import {getAuthToken} from './auth/auth.js'
import { useNavigate } from 'react-router-dom';
import TextEditor from './editor/TextEditor.jsx';

const Write = () => { 
  const navigate = useNavigate();

  useEffect(() =>{
    const token = getAuthToken();
    if(!token) {
      navigate('/signup', {replace: true})
    }
  }, [])

  return (
    <>
      <TextEditor/>
    </>
  );
};

export default Write;
