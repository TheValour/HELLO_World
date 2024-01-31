import React from 'react'
import HeroImg from '/images/hero1.png'
import { Link, Outlet } from 'react-router-dom'

export default function() {
  return (
    <div>
      <img src={HeroImg} alt="" />
      <nav className='bg-green-100' id='category-link'>
        <Link to="/article?cat=all">All</Link>
        <Link to='/article?cat=tech'>Tech</Link>
        <Link to='/article?cat=edu'>Edu</Link>
        <Link to='/article?cat=daily'>Daily</Link>
        <Link to='/write'>Write</Link>
      </nav>
      <Outlet/>
    </div>
  )
}
