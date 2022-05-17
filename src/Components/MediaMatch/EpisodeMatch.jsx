import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'Styles/Base';
import { EpisodeMatch as EpisodeMatchStyle } from './Styles';

const EpisodeMatch = ({ uuid, filePath, fileName, handleCheckboxChange, forwardedRef }) => {   
    return (
        <EpisodeMatchStyle>
            <Checkbox
                ref={forwardedRef}
                type="checkbox"
                id={uuid}
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
    uuid: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    forwardedRef: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]).isRequired
};

export default EpisodeMatch;
