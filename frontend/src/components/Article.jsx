import React from 'react';
import { Link } from 'react-router-dom';

const Article = ({ data }) => {
    const tags = data.tags.map((ele, index) =>
        <span key={index} className='text-xs bg-gray-300 mr-4 p-2 rounded-md'>{ele}</span>
    );

    return (
        <div className='bg-gray-100 my-2 p-2'>
            <div className='flex justify-between pr-16'>
                <Link to={`/read/${data._id}`} >
                    <h2 className="font-semibold">{data.title}</h2>
                    <h2 className="mb-8">{data.description}</h2>
                </Link>
                <img src={data.image} alt={data.title} className='w-24'/>
            </div>
            {tags}
        </div>
    );
};

export default Article;
