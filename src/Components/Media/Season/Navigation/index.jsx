import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateMediaUrl } from 'Helpers';
import { history } from 'Redux/store';
import { orderBy } from 'lodash';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import * as S from '../../MediaItem/Styles';

const SeasonNavigation = ({ series, name }) => {
    const { seasons } = series;
    const seasonList = orderBy(seasons, ['seasonNumber'], ['asc']);
    const handleClick = (event, uuid) => {
        history.push({
            pathname: generateMediaUrl('season', uuid),
        });
    };

    return seasonList.map((item, index) => (
        (item.name === name) && (
            <S.MediaNavigation key={item.seasonNumber}>
                <S.Link
                    disabled={!seasonList[index - 1]}
                    onClick={event => handleClick(event, seasonList[index - 1].uuid)}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </S.Link>
                <S.Link
                    disabled={!seasonList[index + 1]}
                    onClick={event => handleClick(event, seasonList[index + 1].uuid)}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </S.Link>
            </S.MediaNavigation>
        )
    ));
};

SeasonNavigation.propTypes = {
    series: PropTypes.shape({
        seasons: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                seasonNumber: PropTypes.number,
                uuid: PropTypes.string,
            })
        )
    }).isRequired,
    name: PropTypes.string.isRequired,
};

export default SeasonNavigation;
