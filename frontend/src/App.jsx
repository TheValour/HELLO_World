import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from './components/auth/Login'
import Register from './components/auth/Signup'
import Hero from './components/home/Hero'
import Navbar from './components/navbar/Navbar'
import ArticleSection from './components/home/ArticleSection'
import Write from './components/feature/Write'
import Read from './components/feature/Read'
import PublishForm from './components/feature/Publish'
import PageNotFound from './components/PageNotFound'
import UserProfile from './components/UserProfile'

function App() {
  return (
    <Routes>
      <Route path='/signup' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile' element={<UserProfile/>}/>
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
  )
}

export default App
