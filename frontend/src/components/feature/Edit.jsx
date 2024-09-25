import React, { useEffect, useCallback, useContext, useState} from "react";
import { useParams } from 'react-router-dom';

import Quill from "quill";
import "quill/dist/quill.snow.css";

import { toolbarOptions } from "../editor/setting";
import { QuillContext } from "../../context/QuillContext";
import { useNavigate } from "react-router-dom";
import { APIContext } from '../../context/api';
import UpdateArticle from "./UpdateArticle";

export default function Edit() {
  const navigate = useNavigate();
  const {readArticle} = useContext(APIContext);
  const {quill, setQuill, setCount} = useContext(QuillContext);
  const { id } = useParams();

  const [flag, setFlag] = useState(true)
  
  useEffect(() => {
    const fetchQuillContent = async () => {
      try {
        // API call
        const response = await readArticle(id);
        
        const { data } = response;
        const { success, item, message } = data;
        const {postResponse, postDetail} = item;
        console.log("Inside ------", postResponse)
        if (success) {
          const responseQuill = JSON.parse(postResponse.article.quill);
          setQuill(responseQuill);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.log(error);
      } 
    //   finally {
    //     setLoading(false);
    //   }
    };

    fetchQuillContent();
  }, [id]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    
    const q = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    });
    q.setContents(quill)
    q.on("text-change", () => {
      const saveQuill = q.getContents();
      setQuill(saveQuill);
      setFlag(q.getLength() < 50);
      setCount(q.getLength());
    });
  }, [setQuill]);
  
  function onClickHandler() {
    navigate('/update');
  }

  return (
    <>
      <span className="flex flex-col items-center justify-center ">
        <UpdateArticle id={id}/>
        <div id="editor-container" className="w-11/12" ref={wrapperRef}></div>
      </span>
    </>
  );
}
