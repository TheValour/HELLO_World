import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import { QuillContext } from '../../context/QuillContext';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from "react-toastify";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from '../auth/firebase';
import { APIContext } from '../../context/api';

const PublishForm = () => {
  const navigate = useNavigate();
  const {publishArticle} = useContext(APIContext);
  const {user} = useContext(AuthContext);
  const { quill, setQuill, count } = useContext(QuillContext);
  const [image, setImage] = useState();

  // console.log(user)

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

  const uploadFile = async () => {
    try {
      const imageRef = storageRef(storage, uuidv4());
      const snapshot = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      
      const json = JSON.stringify(quill);
      const onPublish = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        "quill": json,
        "artLength": count,
        "likes": 1,
        'image': url
      };
      
      // api - call
      const { data } = await publishArticle(user, onPublish);
  
      const { success, message } = data;
  
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        handleError(message);
      }
      setQuill(null);
      setFormData({ title: '', description: '', tags: '' });
    } catch (error) {
      handleError(error.message);
    }
  };
  console.log(formData.title.length)
  return (
    <div className='flex-box flex-row items-center w-full h-full' >
      <div className='flex-box bg-gray-200 w-2/5 p-5 h-4/5'>
        <label className='text-xl'>Title:</label><br/>
        {formData.title.length <= 30 && <span className='text-xs text-red-400'> have more than 30 char</span>}
        <input type="text" value={formData.title} 
          onChange={handleChange} name="title" 
          className={`w-4/5 border-none p-2 outline-${formData.title.length>30?'green':'red'}-500`} required
          /><br/>

        <label>Write a short Description:</label><br/>
        {formData.description.length <= 50 && <span className='text-xs text-red-400'> have more than 50 char</span>}
        <textarea value={formData.description} onChange={handleChange} 
          name="description" className="w-4/5 h-1/6 p-2" required/>
      </div>

      <div className='flex-box w-2/5 border p-5 h-4/5'>
        <label>Tags (comma-separated):</label><br/>
        <input type="text" value={formData.tags} onChange={handleChange}
          name="tags" className='w-4/5 bg-slate-200 p-2' required/><br/> 
        
        <label>Image:</label><br/>
        <input type="file" onChange={(e) => setImage(e.target.files[0])}
          name="tags" className='w-4/5 bg-slate-200 p-2' required/><br/> 

        <button
          onClick={uploadFile}
          className='bg-green-300 w-1/5 p-1 rounded-sm'
          disabled={formData.description.length < 50 || formData.title.length <= 30}
        >
          Publish
        </button>
      </div>
      <ToastContainer />

    </div>
  );
};

export default PublishForm;
