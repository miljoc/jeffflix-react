import React from 'react'
import { NavButton } from 'Styles/Button';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import FETCH_SESSIONS from 'Queries/fetchSessions';
import { useQuery } from 'react-apollo';
import { Badge } from 'Styles/Base';
import { convertMinutesToMilliseconds, pluralize } from 'Helpers';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { streamingClient } from 'Client';
import { NavIcon } from './Styles'

export default function Activity() {
    const refetchInterval = 5; // interval in minutes

    const { loading, data } = useQuery(FETCH_SESSIONS, {
        client: streamingClient,
        pollInterval: convertMinutesToMilliseconds(refetchInterval)
    });

    if(loading) return false;

    const title = data && data.sessions.length > 0
        ? `${pluralize(data.sessions.length, 'session', 's', true)}`
        : 'No Current Activity';

    return (
        <>
            <ReactTooltip effect="solid" place="left" className="tooltip" delayShow={1000} />
            <Link data-tip={title} to="/current-activity">
                <NavButton hasCount={data.sessions.length > 0}>
                    {data && data.sessions.length > 0 && <Badge circle>{data.sessions.length}</Badge>}
                    <NavIcon icon={faChartSimple} />
                </NavButton>
            </Link>
        </>
    )

}
