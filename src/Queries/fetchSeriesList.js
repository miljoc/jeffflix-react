import gql from 'graphql-tag';

const FETCH_SERIES_LIST = gql`
    query Series($offset: Int, $limit: Int, $sort: SeriesSort, $sortDirection: SortDirection) {
        series(offset: $offset, limit: $limit, sort: $sort, sortDirection: $sortDirection) {
            type: __typename
            name
            posterPath
            uuid
            unwatchedEpisodesCount
            firstAirDate
        }
    }
`;

export default FETCH_SERIES_LIST;
