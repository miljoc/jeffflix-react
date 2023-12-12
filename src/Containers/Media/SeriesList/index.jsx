// @flow
import React, { useState } from 'react';

import Sort from 'Components/Header/Sort';
import Stats from 'Components/Header/Stats';

import MEDIA_STATS from 'Queries/fetchMediaStats';
import { useQuery } from '@apollo/client';
import Loading from 'Components/Loading';
import { ErrorWrap } from 'Components/Error/Styles';

import { getLocalStorage, setLocalStorage } from 'Helpers';
import RenderSeriesList from './RenderSeriesList';

import { LibraryListWrap, RenderListWrap, SortRow } from '../Styles';

const SeriesList = () => {
    const type = "series";

    const sortValues = [{ value: 'name', label: 'Naam'}, { value: 'firstAirDate', label: 'Releasedatum' }];
    const sortDirections = [{ value: 'asc', label: 'Oplopend'}, { value: 'desc', label: 'Aflopend' }];
    const viewOptions = [{ value: 'poster', label: 'Poster' },{ value: 'thumbnail', label: 'Thumbnail' }];

    const [sortOrder, setSortOrder] = useState(getLocalStorage(type, "sortOrder") || sortValues[0]);
    const [sortDirection, setSortDirection] = useState(getLocalStorage(type, "sortDirection") || sortDirections[0]);
    const [view, setView] = useState(getLocalStorage(type, "viewType") || viewOptions[0]);

    const { loading, error, data } = useQuery(MEDIA_STATS);

    if (loading) return <Loading />;
    if (error) return <ErrorWrap>{`Uhooh! ${error.message}`}</ErrorWrap>;

    const { seriesCount } = data.mediaStats;

    return (
        <LibraryListWrap>
            <SortRow>
                <Stats type="series" count={seriesCount} />
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
                    viewOptions={viewOptions}
                    setView={setView}
                    view={view}
                />
            </SortRow>
            <RenderListWrap>
                <RenderSeriesList
                    sortOrder={sortOrder.value}
                    sortDirection={sortDirection.value}
                    viewType={view.value}
                    count={seriesCount}
                />
            </RenderListWrap>
        </LibraryListWrap>
    )
};

export default SeriesList;
