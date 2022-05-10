import gql from 'graphql-tag';

const FETCH_LIBRARIES = gql`
    {
        libraries {
            id
            kind
            isRefreshing
            backend
            filePath
            healthy
        }
    }
`;


export const LIBRARY_STATE = gql`
    query {
        libraries {
            kind
            isRefreshing
        }
    }
`;

export default FETCH_LIBRARIES;
