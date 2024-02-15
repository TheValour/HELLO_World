import React, { createContext, useState } from "react";

export const QuillContext = createContext();

export function QuillContextProvider({ children }) {
    const [quill, setQuill] = useState(null);

    return (
        <QuillContext.Provider value={{ quill, setQuill }}>
            {children}
        </QuillContext.Provider>
    );
}
