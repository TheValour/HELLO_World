import React, { useCallback, useContext, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { toolbarOptions } from "./setting";
import { QuillContext } from "../../context/QuillContext";
import { useNavigate } from "react-router-dom";
import EditorHeader from "./EditorHeader";

export default function TextEditor() {
  const navigate = useNavigate();
  const {quill, setQuill, setCount} = useContext(QuillContext);
  const [flag, setFlag] = useState(true)

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
      setFlag(q.getLength() < 500);
      setCount(q.getLength());
    });
  }, [setQuill]);
  
  function onClickHandler() {
    navigate('/publish');
  }

  return (
    <>
      <span className="flex flex-col items-center justify-center ">
        <EditorHeader onClickHandler={onClickHandler} flag={flag}/>
        <div id="editor-container" className="w-11/12" ref={wrapperRef}></div>
      </span>
    </>
  );
}
