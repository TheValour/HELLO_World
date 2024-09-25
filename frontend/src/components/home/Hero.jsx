import React from 'react';
import TagsBar from '../navbar/TagsBar';
import ArticleSection from './ArticleSection';
import SideSection from './SideSection';
import Footer from './Footer';

const Hero = ()=> {

  return (
    <div>
      <div className='flex justify-center'>
        <div className='w-1/2'>
          <TagsBar/>
          <ArticleSection/>
        </div>
        <SideSection/>
      </div>
      <Footer/>
    </div>
  )
}
export default Hero;
