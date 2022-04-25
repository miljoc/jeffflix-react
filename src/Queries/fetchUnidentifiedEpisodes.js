import gql from 'graphql-tag';

const FETCH_UNIDENTIFIED_EPISODES = gql`
    query UnidentifiedEpisodes($offset: Int, $limit: Int) {
        unidentifiedEpisodeFiles(offset: $offset, limit: $limit) {
          fileName
          filePath
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

export default FETCH_UNIDENTIFIED_EPISODES;
