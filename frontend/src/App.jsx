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
import { AuthContextProvider } from './context/AuthContext'

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Register/>} />
          <Route path='/login' element={<Login/>} />

          <Route path='/' element={<Navbar/>} >
            <Route path='/write' element={<Write/>}/>
            
            <Route  path='/' element={<Hero/>} >
              <Route path='/article' element={<ArticleSection/>}/>
            </Route>
          </Route>
            
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
