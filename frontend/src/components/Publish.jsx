import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { QuillContext } from '../context/QuillContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";


const PublishForm = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const { quill } = useContext(QuillContext);
  console.log(user)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });

  // Update the state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };  
  
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
  toast.success(msg, {
    position: "bottom-left",
  });

  const handlePublish = async () => {
    try {
      if (formData.title && formData.description && formData.tags) {
        var json = JSON.stringify(quill);
        console.log(json);
        const onPublish = {
          title: formData.title,
          description: formData.description,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          "quill":json, 
        };

        const { data } = await axios.post( "http://localhost:3000/write",
          {
            "user":{
              "username":user.username,
              "email": user.email,
            },
            article: {
              ...onPublish,
              "createdAt":new Date()
            },
          },
        );
  
        const { success, message } = data;
  
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          handleError(message);
        }
  
        setFormData({ title: '', description: '', tags: '' });
      } else {
        console.error('Please fill in all fields');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  return (
    <div className='flex-box flex-row items-center w-full h-full' >
      <div className='flex-box bg-gray-200 w-2/5 p-5 h-4/5'>
        <label className='text-xl'>Title:</label><br/>
        <input type="text" value={formData.title} onChange={handleChange} 
          name="title" className='w-4/5 border-none p-2' required/><br/>

        <label>Write a short Description:</label><br/>
        <textarea value={formData.description} onChange={handleChange} 
          name="description" className='w-4/5 h-1/6 p-2' required/>
      </div>

      <div className='flex-box w-2/5 border p-5 h-4/5'>
        <label>Tags (comma-separated):</label><br/>
        <input type="text" value={formData.tags} onChange={handleChange}
          name="tags" className='w-4/5 bg-slate-200 p-2'/><br/> 

        <button
          onClick={handlePublish}
          className='bg-green-300 w-1/5 p-1 rounded-sm'
        >
          Publish
        </button>
      </div>
      <ToastContainer />

    </div>
  );
};

export default PublishForm;
