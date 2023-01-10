import React from 'react';
import PropTypes from 'prop-types';
import TMDBLogo from 'Images/tmdb-logo.svg';
import IMDBLogo from 'Images/imdb-logo.svg';
import { generateIMDbUrl, generateTMDbUrl } from 'Helpers';
import { MediaInfo, MediaInfoLinks } from '../Styles';

function MediaLinks({
    imdbID,
    tmdbID,
    type,
    seasonNumber,
    episodeNumber
}) {
    return (
        <MediaInfo>
            <MediaInfoLinks>
                {tmdbID !== null && (
                    <li>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={generateTMDbUrl(type, tmdbID, seasonNumber, episodeNumber)}
                            aria-label="TMDb"
                        >
                            <img src={TMDBLogo} alt="TMDb" height="20" />
                        </a>
                    </li>
                )}
                {imdbID !== null && (
                    <li>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={generateIMDbUrl(type, imdbID, seasonNumber, episodeNumber)}
                            aria-label="IMDb"
                        >
                            <img src={IMDBLogo} alt="IMDb" height="20" />
                        </a>
                    </li>
                )}
            </MediaInfoLinks>
        </MediaInfo>
    )
}

MediaLinks.propTypes = {
    imdbID: PropTypes.string,
    tmdbID: PropTypes.number.isRequired,
    episodeNumber: PropTypes.number,
    seasonNumber: PropTypes.number,
    type: PropTypes.string.isRequired
};

MediaLinks.defaultProps = {
    imdbID: null,
    episodeNumber: null,
    seasonNumber: null
};

export default MediaLinks;