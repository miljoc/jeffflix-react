// @flow
import React, { useState } from 'react';

import Empty from 'Components/Media/Card/Empty';
import Sort from 'Components/Header/Sort';
import Stats from 'Components/Header/Stats';
import { getLocalStorage, setLocalStorage } from 'Helpers';
import RenderMoviesList from './RenderMovieList';

import { LibraryListWrap, SortRow } from '../Styles';

const MovieList = () => {
    const sortValues = [{ value: 'title', label: 'Title'}, { value: 'releaseDate', label: 'Release Date' }];
    const sortDirections = [{ value: 'asc', label: 'Ascending'}, { value: 'desc', label: 'Descending' }];
    const type = "movie";

    const [sortOrder, setSortOrder] = useState(getLocalStorage(type, "sortOrder") || sortValues[0]);
    const [sortDirection, setSortDirection] = useState(getLocalStorage(type, "sortDirection") || sortDirections[0]);

    return (
        <LibraryListWrap>
            <SortRow>
                <Stats type="movies" />
                <Sort
                    type={type}
                    sortOrder={sortOrder}
                    sortDirection={sortDirection}
                    setSortOrder={setSortOrder}
                    setSortDirection={setSortDirection}
                    setLocalStorage={setLocalStorage}
                    getLocalStorage={getLocalStorage}
                    sortValues={sortValues}
                    sortDirections={sortDirections}
                />
            </SortRow>
            <RenderMoviesList sortOrder={sortOrder.value} sortDirection={sortDirection.value} />
            <Empty />
        </LibraryListWrap>
    )
};

export default MovieList;
