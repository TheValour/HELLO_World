import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Atom = ({ data }) => {
    const tags = data.tags.map((ele, index) =>
        <span key={index} className='text-xs bg-gray-100 mr-4 p-2 rounded-md w-fit'>{ele}</span>
    );

    return (
        <div className='flex'>
            <div className='w-11/12 bg-gray-300 mb-2 p-2 flex justify-between px-4'>
                <div className='flex justify-between flex-col'>
                    <Link to={`/read/${data._id}`} >
                        <h2 className="font-semibold pr-4 mb-2">{data.title}</h2>
                    </Link>
                        
                    {tags}
                </div>
                <img src={data.image} alt={data.title} className='w-20'/>
            </div>
            <Link to={`/edit/${data._id}`} >
                <FontAwesomeIcon icon={faPenToSquare}  className='text-green-600'/>
            </Link>
        </div>
    );
};

export default Atom;
