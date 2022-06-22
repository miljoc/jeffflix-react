// @flow
import React from 'react';
import { useQuery } from '@apollo/client';

import FETCH_SEARCH_RESULTS from 'Queries/fetchSearchResults';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';
import { NoResults } from 'Containers/Styles';

import * as S from '../Styles';

type Props = {
    value: string,
};

const RenderSearchResults = ({ value }: Props) => {
    const { loading, error, data } = useQuery(FETCH_SEARCH_RESULTS, {
        variables: { value },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    if(data.search.length === 0) {
        return <NoResults alignLeft>No results were found for &quot;{value}&quot;</NoResults>
    }

    return data.search.map((item) => {
        const { posterPath, type, title, name, playState, files, uuid, year, firstAirDate } = item;

        return (
            <S.LibraryListItem key={uuid}>
                <MediaCard
                    files={files}
                    name={name}
                    title={title}
                    playState={playState}
                    posterPath={posterPath}
                    type={type}
                    uuid={uuid}
                    year={year || firstAirDate.split("-")[0]}
                    showText
                />
            </S.LibraryListItem>
        );
    });
};

export default RenderSearchResults;
