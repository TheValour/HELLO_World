import React, { useCallback, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { toolbarOptions } from "./setting";

export default function TextEditor() {
  const [quill, setQuill] = useState();

  const showRef = useRef();
  const onClickHandler = () => {
    showRef.current.textContent = ''
    const editor = document.createElement("div");
    showRef.current.append(editor);
    
    const showq = new Quill(editor, {
      readOnly: true,
      theme: "bubble",
    });
    showq.setContents(quill.getContents());
  };

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
    setQuill(q);
  }, []);

  return (
    <>
      <div id="editor-container" ref={wrapperRef}></div>
      <button className="bg-green-400" 
        onClick={onClickHandler}
      >
        Submit
      </button>
      
      <div className="ql-snow">
        <div id="editor-container" ref={showRef}></div>
      </div>
      
    </>
  );
}
