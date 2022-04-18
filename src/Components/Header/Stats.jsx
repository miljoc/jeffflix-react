import React from 'react';
import MEDIA_STATS from 'Queries/fetchMediaStats';
import { useQuery } from 'react-apollo';
import Loading from 'Components/Loading';
import PropTypes from 'prop-types';
import { ErrorWrap } from 'Components/Error/Styles';
import { StatsContent } from "./Styles";

const Stats = ({ type }) => {
    const { loading, error, data } = useQuery(MEDIA_STATS);

    if (loading) return <Loading />;
    if (error) return <ErrorWrap>{`Error! ${error.message}`}</ErrorWrap>;

    const { movieCount, seriesCount, seasonCount, episodeCount } = data.mediaStats;
    let countString = "";

    switch(type) {
        case "movies":
            countString = `${movieCount} Movies`;
            break;
        case "series":
            countString = `${seriesCount} TV Shows, ${seasonCount} Seasons, ${episodeCount} Episodes`;
            break;
        default:
            break;
    }

    return (
        <StatsContent>{countString}</StatsContent>
    );
};

Stats.propTypes = {
    type: PropTypes.string.isRequired,
};

export default Stats;