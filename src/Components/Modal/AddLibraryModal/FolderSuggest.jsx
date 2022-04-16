import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import FETCH_FOLDERS from 'Queries/fetchFolders';
import debounce from 'lodash/debounce';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LoadingIcon } from '../../Header/Search/Styles';

const FolderSuggest = ({ filepath, onChange, libraryType, remote }) => {
    const libraryTypeInt = parseInt(libraryType.value, 10);
    const libraryTypePrefix = libraryTypeInt === 0 ? "local#" : `rclone#${remote?.value}/`;
    const [suggestions, setSuggestions] = useState([]);
    const { loading, error, data, refetch } = useQuery(FETCH_FOLDERS, {
        variables: {
            fullPath: true,
            path: `${libraryTypePrefix}${filepath}`
        },
    });
    
    const getSuggestions = value => {         
        const inputValue = value.trim();
        const inputLength = inputValue.length;
        if(inputLength > 3){
            refetch({
                variables: {
                    fullPath: true,
                    path: `${libraryTypePrefix}${inputValue}`
                }
            });
        }

        const newSuggestions = (inputLength === 0 || error || inputLength < 3) ? [] : data.folders;

        setSuggestions(newSuggestions);

        return newSuggestions;
    };

    const debouncedLoadSuggestions = debounce(getSuggestions, 750);

    const renderSuggestion = suggestion => (
        <div>{suggestion}</div>
    );

    const onSuggestionsFetchRequested = ({ value }) => {        
        debouncedLoadSuggestions(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion) => {
        return libraryTypeInt === 0 ? suggestion : suggestion.replace(remote?.value, '');
    };

    const inputProps = {
        placeholder: 'Enter Filepath',
        value: filepath,
        onChange,
        name: 'filepath'
    };

    return (
        <div className='folderAutosuggest'>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}	
            />
            {loading && <LoadingIcon icon={faSpinner} spin />}
        </div>
    );
}

FolderSuggest.propTypes = {
    filepath: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    libraryType: PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired,
    remote: PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }),
};

FolderSuggest.defaultProps = {
    remote: null,
};

export default FolderSuggest;