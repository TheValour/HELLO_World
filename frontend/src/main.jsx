import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthContextProvider } from './context/AuthContext'
import { QuillContextProvider } from './context/QuillContext'
import { BrowserRouter } from 'react-router-dom'
import { APIContextProvider } from './context/api.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QuillContextProvider>
        <APIContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </APIContextProvider>
      </QuillContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
