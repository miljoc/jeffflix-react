// @flow
import React, { useState } from 'react';

import Empty from 'Components/Media/Card/Empty';
import Sort from 'Components/Header/Sort';
import Stats from 'Components/Header/Stats';
import { getLocalStorage, setLocalStorage } from 'Helpers';
import RenderSeriesList from './RenderSeriesList';

import { LibraryListWrap, SortRow } from '../Styles';

const SeriesList = () => {
    const sortValues = [{ value: 'name', label: 'Name'}, { value: 'firstAirDate', label: 'First Air Date' }];
    const sortDirections = [{ value: 'asc', label: 'Ascending'}, { value: 'desc', label: 'Descending' }];
    const type = "series";

    const [sortOrder, setSortOrder] = useState(getLocalStorage(type, "sortOrder") || sortValues[0]);
    const [sortDirection, setSortDirection] = useState(getLocalStorage(type, "sortDirection") || sortDirections[0]);

    return (
        <LibraryListWrap>
            <SortRow>
                <Stats type="series" />
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
            <RenderSeriesList sortOrder={sortOrder.value} sortDirection={sortDirection.value} />
            <Empty />
        </LibraryListWrap>
    )
};

export default SeriesList;
