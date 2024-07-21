import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthContextProvider } from './context/AuthContext'
import { QuillContextProvider } from './context/QuillContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QuillContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuillContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
