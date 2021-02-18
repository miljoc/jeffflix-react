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
                episodes {
                  episodeNumber
                  uuid
                }
                series {
                    uuid
                    name
                    posterPath
                }
            }

            playState {
                finished
                playtime
            }

            files {
                fileName
                filePath
                uuid
                totalDuration
                library {
                    healthy
                }
                streams {
                    streamType
                    codecMime
                    resolution
                    bitRate
                    language
                }
            }
        }
    }
`;

export default FETCH_EPISODE;
