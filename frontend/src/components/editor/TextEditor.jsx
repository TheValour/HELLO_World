import React, { useCallback, useContext} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { toolbarOptions } from "./setting";
import { QuillContext } from "../../context/QuillContext";
import { useNavigate } from "react-router-dom";

export default function TextEditor() {
  const navigate = useNavigate();
  const {quill, setQuill} = useContext(QuillContext);
  
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
    });
  }, [setQuill]);
  
  function onClickHandler() {
    navigate('/publish');
  }

  return (
    <>
      <div id="editor-container" ref={wrapperRef}></div>
      <button className="bg-green-400" 
        onClick={onClickHandler}
      >
        Submit
      </button>
    </>
  );
}
