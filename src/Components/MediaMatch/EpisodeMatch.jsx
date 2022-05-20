import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'Styles/Base';
import { EpisodeMatch as EpisodeMatchStyle } from './Styles';

const EpisodeMatch = ({ episode, handleCheckboxChange, forwardedRef, index }) => {   
    const { uuid, filePath, fileName } = episode;

    return (
        <EpisodeMatchStyle>
            <Checkbox
                ref={forwardedRef}
                type="checkbox"
                id={uuid}
                data-index={index}
                data-filepath={filePath}
                data-filename={fileName}
                aria-label={fileName}
                onChange={(event) => {
                    handleCheckboxChange(event);                  
                }}
            />
            <label htmlFor={uuid}>{filePath}</label>            
        </EpisodeMatchStyle>
    );
};

EpisodeMatch.propTypes = {
    episode: PropTypes.shape({
        fileName: PropTypes.string,
        filePath: PropTypes.string,
        uuid: PropTypes.string
    }).isRequired,
    index: PropTypes.number.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    forwardedRef: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]).isRequired
};

export default EpisodeMatch;
