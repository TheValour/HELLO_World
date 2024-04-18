import React, { createContext, useState } from "react";

export const QuillContext = createContext();

export function QuillContextProvider({ children }) {
    const [quill, setQuill] = useState(null);
    const [count, setCount] = useState(0);

    return (
        <QuillContext.Provider value={{ quill, setQuill, count, setCount }}>
            {children}
        </QuillContext.Provider>
    );
}
