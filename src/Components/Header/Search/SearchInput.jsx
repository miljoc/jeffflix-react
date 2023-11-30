/* eslint react/jsx-props-no-spreading: ["off"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { faSpinner, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import { InputWrap, LoadingIcon, SearchIcon, NoResultsError, ClearButton, SearchIconWrap } from './Styles';

class SearchInput extends Component {
    constructor() {
        super();

        this.state = {
            hasFocus: false,
            value: '',
        };
    }

    setFocus = (e, hasFocus) => {
        const { toggleFocus, inputProps } = this.props;

        this.setState({ hasFocus }, () => {
            toggleFocus(hasFocus);
            if (hasFocus) {
                inputProps.onFocus(e);
            } else {
                inputProps.onBlur(e);
            }
        });
    };

    setSearch = (e) => {
        const { inputProps } = this.props;

        this.setState({ value: e.target.value });
        inputProps.onChange(e);
    };

    checkKey = (e) => {
        const { location, history, unmount } = this.props;
        const { value } = this.state;

        const splitloc = location.pathname.split('/');
        const currentLocation = splitloc.pop() || splitloc.pop();

        if (e.key === 'Enter' && value.replace(/\s*$/, '') !== currentLocation.replace(/\s*$/, '')) {
            unmount();

            history.push(`/search/${value}`);
        }
    };

    render() {
        const { hasFocus } = this.state;
        const { loading, hasSuggestions, value, inputProps, clearInput } = this.props;

        const noResults = !hasSuggestions && hasFocus && !loading && value.length > 3;

        return (
            <>
                <InputWrap hasFocus={hasFocus}>
                    {loading && <LoadingIcon icon={faSpinner} spin />}
                    <SearchIconWrap>
                        <SearchIcon icon={faSearch} />
                    </SearchIconWrap>
                    <input
                        {...inputProps}
                        onFocus={(e) => {
                            this.setFocus(e, true);
                        }}
                        onBlur={(e) => {
                            this.setFocus(e, false);
                        }}
                        onChange={(e) => {
                            this.setSearch(e);
                        }}
                        onKeyPress={(e) => {
                            this.checkKey(e);
                        }}
                    />
                    {value.length > 0 && (
                        <ClearButton
                            onClick={() => {
                                clearInput();
                            }}
                            icon={faTimes}
                        />
                    )}
                </InputWrap>
                {noResults && <NoResultsError>Geen resultaten gevonden 🥸</NoResultsError>}
            </>
        );
    }
}

SearchInput.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    loading: PropTypes.bool.isRequired,
    toggleFocus: PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    hasSuggestions: PropTypes.bool.isRequired,
    value: PropTypes.string,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
    unmount: PropTypes.func.isRequired,
    inputProps: PropTypes.shape({
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
    }).isRequired,
};

SearchInput.defaultProps = {
    value: '',
};

export default withRouter(SearchInput);
