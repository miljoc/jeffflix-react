import gql from 'graphql-tag';

export const UPDATE_MOVIE = gql`
    mutation updateMovieFileMetadata($input: UpdateMovieFileMetadataInput!) {
        updateMovieFileMetadata(input: $input) {
            error {
                message
            }
        }
    }
`;

export const UPDATE_SERIES = gql`
    mutation updateEpisodeFileMetadata($input: UpdateEpisodeFileMetadataInput!) {
        updateEpisodeFileMetadata(input: $input) {
            error {
                message
            }
        }
    }
`;
