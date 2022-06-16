import React from 'react'
import { InnerContent } from 'Containers/Styles';
import { PageHeading } from 'Styles/Base';
import { MediaOverview } from 'Components/Media/Styles';
import { useQuery } from 'react-apollo';
import FETCH_SESSIONS from 'Queries/fetchSessions';
import FETCH_USERS from 'Queries/fetchUserList';
import Loading from 'Components/Loading';
import { streamingClient } from 'Client';
import { convertMinutesToMilliseconds } from 'Helpers';
import Session from './Session';
import { SessionsList } from './Styles';

const CurrentActivity = () => {
    const { loading, data, error } = useQuery(FETCH_SESSIONS, {
        client: streamingClient,
        pollInterval: convertMinutesToMilliseconds(0.5)
    });
    const { loading: userLoading, data: userData, error: userError } = useQuery(FETCH_USERS);

    if (loading || userLoading) return <Loading />;
    if (error) return `Error! ${error.message}`;
    if (userError) return `Error! ${userError.message}`;

    return (
        <InnerContent>
            <PageHeading>Current Activity</PageHeading>
            {data.sessions.length === 0 && (
                <MediaOverview>All quiet! Nobody is watching anything right now.</MediaOverview>
            )}
            {userData.users && data.sessions.length > 0 && (
                <SessionsList>
                    {data.sessions.map((session) => {
                        return (
                            <Session
                                key={session.sessionID}
                                user={userData.users.find(u => u.id === session.userID) || false}
                                session={session}
                            />
                        );
                    })}
                </SessionsList>
            )}
        </InnerContent>
    )
}

export default CurrentActivity;