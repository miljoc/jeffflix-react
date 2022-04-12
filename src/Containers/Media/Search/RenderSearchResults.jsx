// @flow
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

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
        const { posterPath, type, title, playState, files, uuid } = item;

        return (
            <S.LibraryListItem key={uuid}>
                <MediaCard
                    files={files}
                    name={title}
                    playState={playState}
                    posterPath={posterPath}
                    type={type}
                    uuid={uuid}
                />
            </S.LibraryListItem>
        );
    });
};

export default RenderSearchResults;
