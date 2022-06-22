import React from 'react';
import PropTypes from 'prop-types';
import { HeadingFour, Badge } from 'Styles/Base';
import { StatsContent } from "./Styles";

const Stats = ({ type, count }) => {
    return (
        <StatsContent>
            <HeadingFour>
                {type === "movies"
                    ? <>Movies {count > 0 && <Badge>{count}</Badge>}</>
                    : <>TV Shows {count > 0 && <Badge>{count}</Badge>}</>
                }
            </HeadingFour>
        </StatsContent>
    );
};

Stats.propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};

export default Stats;