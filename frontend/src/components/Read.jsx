import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast } from 'react-toastify';

export default function Read() {
  const { id } = useParams();
  const [quillContent, setQuillContent] = useState(null);
  const [detail, setDetail] = useState({});

  const [loading, setLoading] = useState(true);
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const showRef = useRef();

  useEffect(() => {
    const fetchQuillContent = async () => {
      try {
        // backend call
        const response = await axios.get(`${import.meta.env.VITE_LINK}/read/${id}`);
        const { data } = response;
        const { success, item, message } = data;
        const {postResponse, postDetail} = item;
        setDetail(postDetail);

        if (success) {
          const responseQuill = JSON.parse(postResponse.article.quill);
          setQuillContent(responseQuill);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuillContent();
  }, [id]);

  useEffect(() => {
    if (!loading && quillContent) {
      showRef.current.textContent = '';
      const editor = document.createElement('div');
      showRef.current.appendChild(editor);

      const showq = new Quill(editor, {
        readOnly: true,
        theme: 'bubble',
      });

      showq.setContents(quillContent);
    }
  }, [loading, quillContent]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const tags = detail.tags.map((ele, index) =>
    <span key={index} className='bg-gray-300 ml-4 p-2 rounded-md'>{ele}</span>
  );

  return (
    <div className='py-4 pb-10'>
      <div className=' flex items-center flex-col text-2xl py-5 font-semibold'>
        <h2 className='py-4'>{detail.title}</h2>
        <img src={detail.image} alt={detail.title} className='w-96'/>
      </div>
      
      <div className="ql-snow">
        <div id="editor-container" ref={showRef}></div>
      </div>
      {tags}

      <div className='mt-20 ml-4'>
        author <span className='text-blue-600'>{detail.username}</span>
      </div>
    </div>
  );
}
