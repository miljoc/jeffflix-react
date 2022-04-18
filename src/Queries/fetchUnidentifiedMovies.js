import gql from 'graphql-tag';

const FETCH_UNIDENTIFIED_MOVIES = gql`
    query UnidentifiedMovies {
        unidentifiedMovieFiles {
          fileName
          filePath
          libraryId
          uuid
          totalDuration
          fileSize
          library {
            kind
            name
          }
        }
    }
`;

export default FETCH_UNIDENTIFIED_MOVIES;
