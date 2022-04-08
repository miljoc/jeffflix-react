import React from 'react';
import PropTypes from 'prop-types';

import { CardTitle, CardInfo } from './Styles';

const MediaName = ({ episodes, type, year, name, title, episodeNumber, seasonNumber }) => {
    const info = () => {
        let infoValue;

        switch (type) {
            case 'Season':
                infoValue = `${episodes.length} Episode${episodes.length > 1 ? 's' : ''}`;
                break;
            case 'Episode':
                infoValue = `${seasonNumber ? `S${seasonNumber}  E${episodeNumber}` : `Episode ${episodeNumber}`}`;
                break;
            case 'Movie':
                infoValue = year;
                break;
            case 'Series':
                infoValue = year;
                break;
            default:
                break;
        }

        return infoValue;
    };

    return (
        <>
            <CardTitle>{type === 'Movie' ? title : name}</CardTitle>
            <CardInfo>{info()}</CardInfo>
        </>
    );
};

MediaName.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string.isRequired,
    year: PropTypes.string,
    episodeNumber: PropTypes.number,
    seasonNumber: PropTypes.number,
    episodes: PropTypes.arrayOf(
        PropTypes.shape({
            uuid: PropTypes.string,
        }),
    ),
};

MediaName.defaultProps = {
    episodes: [],
    seasonNumber: null,
    episodeNumber: null,
    year: null,
    title: null
};

export default MediaName;
