// @flow
import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';

import RECENTLY_ADDED from 'Queries/fetchRecentlyAdded';

import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import Carousel from 'Components/Carousel';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { ErrorWrap } from 'Components/Error/Styles';
import { NoResults } from 'Containers/Styles';
import { MediaCardWrap } from './Styles';

const RenderRecentMovies = ({ sModal }: { sModal: Function }) => {
    const { loading, error, data } = useQuery(RECENTLY_ADDED, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Loading />;
    if (error) return <ErrorWrap marginLeft>{`Error! ${error.message}`}</ErrorWrap>;

    const toggleModal = () =>
        sModal(LIBRARY_MODAL, {
            title: 'Add Movies folder',
            type: 'movies',
        });

    const movies = data.recentlyAdded.filter((m) => m.type === 'Movie');

    const RecentlyAddedMovies = movies.map((item) => {
        if (item.name.length === 0) return false;

        const { files, name, title, playState, type, uuid, posterPath, year } = item;

        return (
            <MediaCardWrap key={uuid}>
                <MediaCard
                    showText
                    files={files}
                    name={name}
                    title={title}
                    playState={playState}
                    posterPath={posterPath}
                    type={type}
                    uuid={uuid}
                    year={year}
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

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(null, mapDispatchToProps)(RenderRecentMovies);
