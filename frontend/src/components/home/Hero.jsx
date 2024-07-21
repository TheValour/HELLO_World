import React from 'react';
import TagsBar from '../navbar/TagsBar';
import ArticleSection from './ArticleSection';
import SideSection from './SideSection';

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
