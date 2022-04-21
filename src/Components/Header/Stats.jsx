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

    const { movieCount, seriesCount } = data.mediaStats;

    return (
        <StatsContent>
            <h4>
                {type === "movies"
                    ? <>Movies <span>{movieCount}</span></>
                    : <>TV Shows <span>{seriesCount}</span></>
                }
            </h4>
        </StatsContent>
    );
};

Stats.propTypes = {
    type: PropTypes.string.isRequired,
};

export default Stats;