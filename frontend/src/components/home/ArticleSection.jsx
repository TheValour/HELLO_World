import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Article from './Article';
import { APIContext } from '../../context/api';

export default function ArticleSection() {
    const {getArticleList} = useContext(APIContext);

    const [param] = useSearchParams();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    let categoryToFilter = param.get('cat');
    
    const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
    useEffect(() => {
        const fetchlistData = async () => {
            try {
            //backend call
            if(categoryToFilter === null) categoryToFilter = 'all';
            const response = await getArticleList(categoryToFilter);

            const { data } = response;
            const { success, listResponse, message } = data;
            // console.log(listResponse)
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
