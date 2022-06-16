import gql from "graphql-tag";

const FETCH_FILE_LOCATOR = gql`
    query getMediaFileFromFileLocator($fileLocator: String!) {
        getMediaFileFromFileLocator(fileLocator: $fileLocator){
            __typename            
            ...on MovieFile {
                fileName
                movie {
                    backdropPath
                    posterPath
                    title
                    year
                    uuid
                }
            }
            ...on EpisodeFile {
                fileName
                episode {
                    uuid                    
                    name
                    stillPath
                    episodeNumber
                    season {
                        uuid
                        name
                        seasonNumber                        
                        posterPath
                        series {  
                            uuid                          
                            name
                            posterPath
                            firstAirDate
                        }
                    }
                }
            }
        }
    }
`;

export default FETCH_FILE_LOCATOR;