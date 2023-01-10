import gql from 'graphql-tag';

const FETCH_MOVIE = gql`
    query movies($uuid: String!) {
        movies(uuid: $uuid) {
            type: __typename
            name
            title
            year
            overview
            imdbID
            tmdbID
            backdropPath
            uuid
            posterPath

            playState {
                finished
                playtime
            }

            files {
                fileName
                filePath
                fileSize
                uuid
                totalDuration
                library {
                    healthy
                }
                streams {
                    codecMime
                    codecName
                    streamType
                    resolution
                    bitRate
                    language
                    profile
                }
            }
        }
    }
`;

export default FETCH_MOVIE;
