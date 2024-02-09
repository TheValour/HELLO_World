import React from 'react';
import { Link, Outlet } from 'react-router-dom'

const Hero = ()=> {
  return (
    <div>
      <nav className='mt-3 p-2 border-b-2 border-gray-200' id='category-link'>
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
export default Hero;
