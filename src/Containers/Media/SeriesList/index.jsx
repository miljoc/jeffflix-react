// @flow
import React, { useState } from 'react';

import Empty from 'Components/Media/Card/Empty';
import Sort from 'Components/Header/Sort';
import Stats from 'Components/Header/Stats';
import RenderSeriesList from './RenderSeriesList';

import { LibraryListWrap, SortRow } from '../Styles';

const SeriesList = () => {
    const [sortOrder, setSortOrder] = useState({ value: 'name', label: 'Name'});    
    const sortValues = [{ value: 'name', label: 'Name'}, { value: 'firstAirDate', label: 'First Air Date' }];

    const [sortDirection, setSortDirection] = useState({ value: 'asc', label: 'Ascending'});
    const sortDirections = [{ value: 'asc', label: 'Ascending'}, { value: 'desc', label: 'Descending' }];

    return (
        <LibraryListWrap>
            <SortRow>
                <Stats type="series" />
                <Sort
                    sortOrder={sortOrder}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                    setSortOrder={setSortOrder}
                    sortValues={sortValues}
                    sortDirections={sortDirections}
                />
            </SortRow>
            <RenderSeriesList sortOrder={sortOrder.value} sortDirection={sortDirection.value} />
            <Empty />
        </LibraryListWrap>
    )
};

export default SeriesList;
