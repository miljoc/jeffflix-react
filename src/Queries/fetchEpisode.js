import gql from 'graphql-tag';

const FETCH_EPISODE = gql`
    query episode($uuid: String!) {
        episode(uuid: $uuid) {
            type: __typename
            name
            overview
            airDate
            stillPath
            uuid
            episodeNumber

            season {
                uuid
                name
                seasonNumber
                episodes {
                  episodeNumber
                  uuid
                }
                series {
                    uuid
                    name
                    posterPath
                    tmdbID
                }
            }

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
                    streamType
                    codecMime
                    codecName
                    resolution
                    bitRate
                    language
                    profile
                }
            }
        }
    }
`;

export default FETCH_EPISODE;
