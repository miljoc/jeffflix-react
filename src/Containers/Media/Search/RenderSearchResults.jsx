// @flow
import React from 'react';
import { useQuery } from '@apollo/client';

import FETCH_SEARCH_RESULTS from 'Queries/fetchSearchResults';
import Loading from 'Components/Loading';
import { NoResults } from 'Containers/Styles';
import Library from '../Library';

type Props = {
    value: string,
};

const RenderSearchResults = ({ value }: Props) => {
    const { loading, error, data } = useQuery(FETCH_SEARCH_RESULTS, {
        variables: { value },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    if(data.search.length) {
        return (
            <Library
                count={data.search.length}
                data={data.search}
                loadMoreItems={() => false}
                debounceAmount={300}
            />
        );
    }

    return <NoResults alignLeft>No results were found for &quot;{value}&quot;</NoResults>

};

export default RenderSearchResults;
