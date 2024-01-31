import React, { useEffect, useState } from 'react';
import {getAuthToken} from './auth/auth.js'
import { useNavigate } from 'react-router-dom';

const Write = () => { 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgLink: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  useEffect(() =>{
    const token = getAuthToken();
    if(!token) {
      navigate('/signup', {replace: true})
    }
  }, [])

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4  text-center">Write an Article</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="imgLink" className="block text-sm font-medium text-gray-600">
            Image Link
          </label>
          <input
            type="url"
            id="imgLink"
            name="imgLink"
            value={formData.imgLink}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-600">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-non"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
