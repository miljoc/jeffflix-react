import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { Redirect } from 'react-router';
import { hideModal } from 'Redux/Actions/modalActions';

import { UPDATE_MOVIE, UPDATE_SERIES } from 'Mutations/fixMismatch';

import { SEARCH_MOVIES, SEARCH_SERIES } from 'Queries/tmdbSearch';

import Loading from 'Components/Loading';
import { TextInput } from 'Components/Form';
import { AlertInline } from 'Components/Alerts';
import FETCH_UNIDENTIFIED_MOVIES from 'Queries/fetchUnidentifiedMovies';
import FETCH_UNIDENTIFIED_EPISODES from 'Queries/fetchUnidentifiedEpisodes';
import FETCH_MEDIA_STATS from 'Queries/fetchMediaStats';
import MediaList from '../FixMismatch/MediaList';

import * as S from '../FixMismatch/Styles';

const MediaMatch = ({ hModal, uuid, type, name }) => {
    const [
        fixMismatch,
        { data: mismatchData, error: mismatchError }
    ] = useMutation(type === 'movie' ? UPDATE_MOVIE : UPDATE_SERIES, {
        refetchQueries: [
            { query: FETCH_UNIDENTIFIED_MOVIES },
            { query: FETCH_UNIDENTIFIED_EPISODES },
            { query: FETCH_MEDIA_STATS }
        ]
    });
    const alert = useAlert();

    const [searchVal, setSearchVal] = useState(name);
    const [tmdbID, setTmdbID] = useState('');
    const { loading, error, data, refetch, networkStatus } = useQuery(
        (type === 'movie' && SEARCH_MOVIES) || SEARCH_SERIES,
        {
            variables: { query: name },
        },
    );


    if (mismatchData) {
        hModal();
        alert.success('Successfully added match');

        return <Redirect to={{ pathname: `/${type === 'movie' ? 'movies' : 'series'}` }} />;
    }

    const mutationHandler = (id) => {
        let input = {
            tmdbID: parseInt(id, 10),
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

    if (error) return <p>Error Fetching Data</p>;
    if (loading && !data) return <Loading />;

    const items = data.tmdbSearchMovies || data.tmdbSearchSeries;

    return (
        <>
            {mismatchError &&
                <AlertInline type="error">There was a problem with your request please try again</AlertInline>
            }
            <S.SearchWrap
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <TextInput
                    type="text"
                    name={name}
                    value={tmdbID}
                    placeholder="Enter TMDB ID"
                    autoFocus
                    onChange={(e) => setTmdbID(e.target.value)}
                />
                <S.Button
                    type="submit"
                    onClick={() => mutationHandler(tmdbID)}
                    disabled={tmdbID.length <= 1 || loading}
                >
                    Submit
                </S.Button>
            </S.SearchWrap>

            <S.SearchWrap
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <TextInput
                    type="text"
                    name={name}
                    value={searchVal}
                    placeholder="Enter Search Term"
                    autoFocus
                    onChange={(e) => setSearchVal(e.target.value)}
                />
                <S.Button
                    type="submit"
                    onClick={() => refetch({ query: searchVal })}
                    disabled={searchVal.length <= 1 || loading}
                >
                    Search
                </S.Button>
            </S.SearchWrap>

            <MediaList
                uuid={uuid}
                searchVal={searchVal}
                items={items}
                networkStatus={networkStatus}
                type={type}
                onlyOnSubmit
            />
        </>
    );
};

MediaMatch.propTypes = {
    hModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    uuid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    type: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(MediaMatch);