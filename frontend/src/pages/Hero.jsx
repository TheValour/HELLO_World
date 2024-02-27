import React from 'react';
import TagsBar from '../components/TagsBar';
import ArticleSection from '../components/ArticleSection';
import SideSection from '../components/SideSection';

const Hero = ()=> {

  return (
    <div className='flex justify-center'>
      <div className='w-3/5'>
        <TagsBar/>
        <ArticleSection/>
      </div>
      <SideSection/>
    </div>
  )
}
export default Hero;
