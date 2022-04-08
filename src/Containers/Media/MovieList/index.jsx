// @flow
import React, { useState } from 'react';

import Empty from 'Components/Media/Card/Empty';
import Sort from 'Components/Header/Sort';
import RenderMoviesList from './RenderMovieList';

import { LibraryListWrap } from '../Styles';

const MovieList = () => {    
    const [sortOrder, setSortOrder] = useState({ value: 'title', label: 'Title'});    
    const sortValues = [{ value: 'title', label: 'Title'}, { value: 'releaseDate', label: 'Release Date' }];

    const [sortDirection, setSortDirection] = useState({ value: 'asc', label: 'Ascending'});
    const sortDirections = [{ value: 'asc', label: 'Ascending'}, { value: 'desc', label: 'Descending' }];

    return (
        <LibraryListWrap>
            <Sort
                sortOrder={sortOrder}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                setSortOrder={setSortOrder}
                sortValues={sortValues}
                sortDirections={sortDirections}
            />
            <RenderMoviesList sortOrder={sortOrder.value} sortDirection={sortDirection.value} />
            <Empty />
        </LibraryListWrap>
    )
};

export default MovieList;
