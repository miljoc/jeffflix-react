import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { Redirect } from 'react-router';

import { UPDATE_MOVIE, UPDATE_SERIES } from 'Mutations/fixMismatch';
import { hideModal } from 'Redux/Actions/modalActions';

import Loading from 'Components/Loading';
import { AlertInline } from 'Components/Alerts';
import { Scrollbars } from 'react-custom-scrollbars';

import FETCH_UNIDENTIFIED_MOVIES from 'Queries/fetchUnidentifiedMovies';
import FETCH_UNIDENTIFIED_EPISODES from 'Queries/fetchUnidentifiedEpisodes';
import FETCH_MEDIA_STATS from 'Queries/fetchMediaStats';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { LoadingWrap, MediaList as MediaListWrap, MediaListItem, renderThumb, renderTrack } from './Styles';

const MediaList = ({ hModal, uuid, searchVal, items, networkStatus, type, onlyOnSubmit }) => {
    const [fixMismatch, { data, error, loading }] = useMutation(type === 'movie' ? UPDATE_MOVIE : UPDATE_SERIES, {
        refetchQueries: [
            { query: FETCH_UNIDENTIFIED_MOVIES },
            { query: FETCH_UNIDENTIFIED_EPISODES },
            { query: FETCH_MEDIA_STATS }            
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

        switch (type) {
            case "movie":
                input = {
                    ...input,
                    movieFileUUID: uuid,
                };                    
                break;
            case "episode":
                input = {
                    ...input,
                    episodeFileUUID: uuid,                    
                }
                break;
            default:
                input = {
                    ...input,
                    seriesUUID: uuid,
                };
                break;
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
                renderThumbVertical={renderThumb}
                renderTrackVertical={renderTrack}
            >
                {loading && <LoadingWrap><Loading /></LoadingWrap>}
                <MediaListWrap>
                    {items.map((item) => (
                        <MediaListItem key={item.tmdbID}>
                            <button
                                disabled={uuid.length === 0}
                                type="button"
                                onClick={() => mutationHandler(item)}
                            >
                                {item.name || item.title} <span>{item.releaseYear || item.firstAirYear}</span>
                            </button>
                            <a
                                href={`https://www.themoviedb.org/${type !== "movie" ? "tv" : type}/${item.tmdbID}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View on TMDB"
                            >
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </a>
                        </MediaListItem>
                    ))}
                </MediaListWrap>
            </Scrollbars>
        </>
    );
};

MediaList.propTypes = {
    hModal: PropTypes.func.isRequired,
    uuid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
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
