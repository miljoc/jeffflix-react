import gql from 'graphql-tag';

export const SEARCH_MOVIES = gql`
    query($query: String!) {
        tmdbSearchMovies(query: $query) {
            title
            releaseYear
            tmdbID
        }
    }
`;

export const SEARCH_SERIES = gql`
    query($query: String!) {
        tmdbSearchSeries(query: $query) {
            name
            firstAirYear
            tmdbID
        }
    }
`;
