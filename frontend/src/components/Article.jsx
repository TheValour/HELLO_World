import React from 'react';
import { Link } from 'react-router-dom';

const Article = ({ data }) => {
    
    return (
        <Link to={`/read/${data._id}`} className='bg-blue-100 my-2'>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <img src={data.img} alt={data.title} />
        </Link>
    );
};

export default Article;
