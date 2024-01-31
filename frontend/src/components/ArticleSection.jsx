import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Article from './Article';
import data from '../data';

export default function ArticleSection() {
    const [param] = useSearchParams();
    const categoryToFilter = param.get('cat');

    let filteredData = data;

    if (categoryToFilter && categoryToFilter !== 'all') {
        filteredData = data.filter((ele) => ele.category === categoryToFilter);
    }

    const articles = filteredData.map((ele) => (
        <Article key={ele.id} data={ele} />
    ));

    return (
        <div>
            {articles}
        </div>
    );
}
