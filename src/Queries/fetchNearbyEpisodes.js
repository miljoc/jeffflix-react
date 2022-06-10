import gql from "graphql-tag";

const FETCH_NEARBY = gql`
    query fetchNearby($uuid: String!, $nextLimit: Int){
        nearbyEpisodes(uuid: $uuid, nextLimit: $nextLimit) {            
            next {
                type: __typename
                name
                overview
                airDate
                stillPath
                uuid
                episodeNumber
                
                season {
                  name
                  series {
                    name
                  }
                }

                files {
                    fileName
                    filePath
                    fileSize
                    uuid
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
    }
`;

export default FETCH_NEARBY;