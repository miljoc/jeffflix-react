import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { Redirect } from 'react-router';
import { hideModal } from 'Redux/Actions/modalActions';

import { UPDATE_MOVIE, UPDATE_SERIES } from 'Mutations/fixMismatch';

import { SEARCH_MOVIES, SEARCH_SERIES } from 'Queries/tmdbSearch';

import Loading from 'Components/Loading';
import { TextInput } from 'Components/Form';
import { AlertInline } from 'Components/Alerts';
import MediaList from './MediaList';

import * as S from './Styles';

const FixMismatch = ({ hModal, uuid, type, name }) => {
    const [
        fixMismatch,
        { data: mismatchData, error: mismatchError }
    ] = useMutation(type === 'movie' ? UPDATE_MOVIE : UPDATE_SERIES);
    const alert = useAlert();

    const [searchVal, setSearchVal] = useState('');
    const [tmdbID, setTmdbID] = useState('');
    const { loading, error, data, refetch, networkStatus } = useQuery(
        (type === 'movie' && SEARCH_MOVIES) || SEARCH_SERIES,
        {
            variables: { query: name },
        },
    );


    if (mismatchData) {
        hModal();
        alert.success('Successfully fixed mismatch');

        return <Redirect to={{ pathname: `/${type === 'movie' ? 'movies' : 'series'}` }} />;
    }

    const mutationHandler = (id) => {
        let input = {
            tmdbID: parseInt(id, 10),
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

            <MediaList uuid={uuid} searchVal={searchVal} items={items} networkStatus={networkStatus} type={type} />
        </>
    );
};

FixMismatch.propTypes = {
    hModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    hModal: () => dispatch(hideModal()),
});

export default connect(
    null,
    mapDispatchToProps,
)(FixMismatch);