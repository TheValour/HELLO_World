import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toast } from 'react-toastify';

export default function Read() {
  const { id } = useParams();
  const [quillContent, setQuillContent] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id,  "hello")
  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const showRef = useRef();

  useEffect(() => {
    const fetchQuillContent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/read/${id}`);
        const { data } = response;
        const { success, postResponse, message } = data;

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

  return (
    <div className="ql-snow">
      <div id="editor-container" ref={showRef}></div>
    </div>
  );
}
