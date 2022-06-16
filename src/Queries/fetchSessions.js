import gql from "graphql-tag";

const FETCH_SESSIONS = gql`
    query sessions {
        sessions {
            fileLocator
            sessionID
            userID
            paused
            progress
            streams {
                transcodingPercentage
                throttled
                transcoded
                transmuxed
                lastAccessed
                container
                resolution
                codecs
                codecName
                streamType
                language
                title
                bitRate
                streamID
                transcodingState
            }
        }
    }
`;

export default FETCH_SESSIONS;