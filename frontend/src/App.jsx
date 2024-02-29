import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Hero from './pages/Hero'
import Navbar from './components/Navbar'
import PageNotFound from './pages/PageNotFound'
import ArticleSection from './components/ArticleSection'
import Write from './components/Write'
import Register from './components/auth/Signup'
import Login from './components/auth/Login'
import PublishForm from './components/Publish'

import { AuthContextProvider } from './context/AuthContext'
import { QuillContextProvider } from './context/QuillContext'
import Read from './components/Read'

function App() {
  console.log(import.meta.env.VITE_LINK);
  return (
    <AuthContextProvider>
      <QuillContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/publish' element={<PublishForm/>}/>
            <Route path='/write' element={<Write/>}/>

            <Route path='/' element={<Navbar/>} >
              <Route  path='/' element={<Hero/>} >
                <Route path='/article' element={<ArticleSection/>}/>
              </Route>

              <Route path='/read/:id' element={<Read/>}/>
            </Route>
              
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </QuillContextProvider>
    </AuthContextProvider>
  )
}

export default App
