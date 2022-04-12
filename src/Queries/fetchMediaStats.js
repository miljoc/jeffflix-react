import gql from 'graphql-tag';

const MEDIA_STATS = gql`
{
  mediaStats {
    movieCount
    seriesCount
    seasonCount
    episodeCount
  }
}

`;

export default MEDIA_STATS;
