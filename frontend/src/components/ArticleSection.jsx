import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Article from './Article';
import data from '../data';
import axios from 'axios';

export default function ArticleSection() {
    const [param] = useSearchParams();
    const [list, setList] = useState([]);
    const categoryToFilter = param.get('cat');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchlistData = async () => {
            try {
            const response = await axios.get(`http://localhost:3000/list/${categoryToFilter==='all'?'':categoryToFilter}`);
            const { data } = response;
            const { success, listResponse, message } = data;

            if (success) {
               console.log(listResponse)
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
        <div>
            {articles}
        </div>
    );
}
