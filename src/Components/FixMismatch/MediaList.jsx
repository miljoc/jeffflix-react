import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { Redirect } from 'react-router';

import { UPDATE_MOVIE, UPDATE_SERIES } from 'Mutations/fixMismatch';
import { hideModal } from 'Redux/Actions/modalActions';

import Loading from 'Components/Loading';
import { AlertInline } from 'Components/Alerts';
import { Scrollbars } from 'react-custom-scrollbars';

import FETCH_UNIDENTIFIED_MOVIES from 'Queries/fetchUnidentifiedMovies';
import * as S from './Styles';

const MediaList = ({ hModal, uuid, searchVal, items, networkStatus, type, onlyOnSubmit }) => {
    const [fixMismatch, { data, error }] = useMutation(type === 'movie' ? UPDATE_MOVIE : UPDATE_SERIES, {
        refetchQueries: [
            { query: FETCH_UNIDENTIFIED_MOVIES }
        ]
    });
    const alert = useAlert();

    if (networkStatus === 4) return <Loading />;
    if (onlyOnSubmit && items.length === 0) return <AlertInline>No results found.</AlertInline>;
    if (items.length === 0) return <AlertInline>No results found for {searchVal}</AlertInline>;

    if (data) {
        hModal();
        alert.success('Successfully fixed mismatch');

        return <Redirect to={{ pathname: `/${type === 'movie' ? 'movies' : 'series'}` }} />;
    }

    const mutationHandler = (item) => {
        let input = {
            tmdbID: item.tmdbID,
        };

        if (type === 'movie') {
            input = {
                ...input,
                movieFileUUID: uuid,
            };
        } else {
            input = {
                ...input,
                seriesUUID: uuid,
            };
        }

        fixMismatch({ variables: { input } });
    };

    return (
        <>
            {error && <AlertInline type="error">There was a problem with your request please try again</AlertInline>}
            <Scrollbars
                autoHide
                autoHeight
                autoHeightMax={300}
                renderThumbVertical={S.renderThumb}
                renderTrackVertical={S.renderTrack}
            >
                <S.MediaList>
                    {items.map((item) => (
                        <button type="button" key={item.tmdbID} onClick={() => mutationHandler(item)}>
                            {item.name || item.title} <span>{item.releaseYear || item.firstAirYear}</span>
                        </button>
                    ))}
                </S.MediaList>
            </Scrollbars>
        </>
    );
};

MediaList.propTypes = {
    hModal: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    searchVal: PropTypes.string,
    networkStatus: PropTypes.number,
    onlyOnSubmit: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

MediaList.defaultProps = {
    searchVal: '',
    networkStatus: null,
    onlyOnSubmit: false
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(MediaList);
