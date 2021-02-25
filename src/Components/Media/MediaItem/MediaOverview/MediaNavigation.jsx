import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateMediaUrl } from 'Helpers';
import { history } from 'Redux/store';
import { orderBy } from 'lodash';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import * as S from '../Styles';

type Props = {
    episodeNumber: number,
    season: Array<Object>,
};

const MediaNavigation = ({ season, episodeNumber }: Props) => {

    const { episodes } = season;

    function handleClick(event, uuid){
        history.push({
            pathname: generateMediaUrl('episode', uuid),
            state: {
                resume: false
            },
        });
    }
    const episodeList = orderBy(episodes, ['episodeNumber'], ['asc']);

    return episodeList.map((episode, index) => (
        (episode.episodeNumber === episodeNumber) && (
            <S.MediaNavigation key={episode.episodeNumber}>
                <S.Link
                    data-tip="Previous Episode"
                    disabled={!episodeList[index - 1]}
                    onClick={event => handleClick(event, episodeList[index - 1].uuid)}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </S.Link>
                <S.Link
                    data-tip="Next Episode"
                    disabled={!episodeList[index + 1]}
                    onClick={event => handleClick(event, episodeList[index + 1].uuid)}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </S.Link>
            </S.MediaNavigation>
        )
    ));

};

export default MediaNavigation;
