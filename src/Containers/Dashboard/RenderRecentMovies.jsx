import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo';

import RECENTLY_ADDED from 'Queries/fetchRecentlyAdded';

import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import Carousel from 'Components/Carousel';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { NoResults } from 'Containers/Styles';
import { MediaCardWrap } from './Styles';

const RenderRecentMovies = ({ sModal }) => {
    const { loading, error, data } = useQuery(RECENTLY_ADDED, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const toggleModal = () =>
        sModal(LIBRARY_MODAL, {
            title: 'Add Movies folder',
            type: 'movies',
        });

    const movies = data.recentlyAdded.filter((m) => m.type === 'Movie');

    const RecentlyAddedMovies = movies.map((item) => {
        if (item.name.length === 0) return false;

        const { files, name, playState, type, uuid } = item;
        const posterPath = item.posterPath || item.season.series.posterPath;

        return (
            <MediaCardWrap key={uuid}>
                <MediaCard
                    showText
                    files={files}
                    name={name}
                    playState={playState}
                    posterPath={posterPath}
                    type={type}
                    uuid={uuid}
                />
            </MediaCardWrap>
        );
    });

    if (movies.length === 0) {
        return (
            <NoResults alignLeft>
                {'You currently have no Movies.'}
                <button type="button" onClick={() => toggleModal()}>
                    Add a Movies folder
                </button>
            </NoResults>
        );
    }

    return <Carousel>{RecentlyAddedMovies}</Carousel>;
};

RenderRecentMovies.propTypes = {
    sModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(RenderRecentMovies);
