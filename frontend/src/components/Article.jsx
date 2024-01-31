import React from 'react';

const Article = ({ data }) => {
    
    return (
        <div className='bg-blue-100 my-2'>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <img src={data.img} alt={data.title} />
        </div>
    );
};

export default Article;
