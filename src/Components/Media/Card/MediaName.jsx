import React from 'react';
import PropTypes from 'prop-types';

import { pluralize } from 'Helpers';
import { CardTitle, CardInfo } from './Styles';

const MediaName = ({ episodes, type, year, name, title, episodeNumber, seasonNumber }) => {
    const info = () => {
        let infoValue;

        switch (type) {
            case 'Season':
                infoValue = `${episodes.length} ${pluralize(episodes.length, 'Aflevering', 'en')}`;
                break;
            case 'Episode':
                infoValue = `${seasonNumber ? `S${seasonNumber}  E${episodeNumber}` : `Aflevering ${episodeNumber}`}`;
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

    const renderName = () => {
        return type === 'Movie' ? title : name;
    };

    const renderedName = renderName();

    return (
        <>
            <CardTitle title={renderedName.length > 18 ? renderedName : null}>{renderedName}</CardTitle>
            <CardInfo>{info()}</CardInfo>
        </>
    );
};

MediaName.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
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
    title: null,
    type: ''
};

export default MediaName;
