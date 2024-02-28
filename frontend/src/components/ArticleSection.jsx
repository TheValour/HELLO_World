import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Article from './Article';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ArticleSection() {
    const [param] = useSearchParams();
    const [list, setList] = useState([]);
    const categoryToFilter = param.get('cat');
    const [loading, setLoading] = useState(true);
    
    const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
    useEffect(() => {
        const fetchlistData = async () => {
            try {
            //backend call
            const response = await axios.get(`${import.meta.env.VITE_LINK}/list/${categoryToFilter==='all'?'':categoryToFilter}`);
            const { data } = response;
            const { success, listResponse, message } = data;
            console.log(listResponse)
            if (success) {
               setList(listResponse)
            } else {
                handleError(message);
            }
            } catch (error) {
            console.log(error);
            } finally {
            setLoading(false);
            }
        };

        fetchlistData();
    }, [param]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const articles = list.map((ele) => (
        <Article key={ele._id} data={ele} />
    ));

    return (
        <div >
            {articles}
        </div>
    );
}
