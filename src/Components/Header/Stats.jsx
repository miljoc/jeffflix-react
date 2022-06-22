import React from 'react';
import MEDIA_STATS from 'Queries/fetchMediaStats';
import { useQuery } from '@apollo/client';
import Loading from 'Components/Loading';
import PropTypes from 'prop-types';
import { ErrorWrap } from 'Components/Error/Styles';
import { HeadingFour, Badge } from 'Styles/Base';
import { StatsContent } from "./Styles";

const Stats = ({ type }) => {
    const { loading, error, data } = useQuery(MEDIA_STATS);

    if (loading) return <Loading />;
    if (error) return <ErrorWrap>{`Error! ${error.message}`}</ErrorWrap>;

    const { movieCount, seriesCount } = data.mediaStats;

    return (
        <StatsContent>
            <HeadingFour>
                {type === "movies"
                    ? <>Movies {movieCount > 0 && <Badge>{movieCount}</Badge>}</>
                    : <>TV Shows {seriesCount > 0 && <Badge>{seriesCount}</Badge>}</>
                }
            </HeadingFour>
        </StatsContent>
    );
};

Stats.propTypes = {
    type: PropTypes.string.isRequired,
};

export default Stats;