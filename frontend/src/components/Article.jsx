import React from 'react';
import { Link } from 'react-router-dom';

const Article = ({ data }) => {
    
    return (
        <div className='bg-blue-200 my-2 p-2'>
            <Link to={`/read/${data._id}`} >
                <h2>{data.title}</h2>
                <p>{data.description}</p>
                <img src={data.img} alt={data.title} />
            </Link>
        </div>
    );
};

export default Article;
