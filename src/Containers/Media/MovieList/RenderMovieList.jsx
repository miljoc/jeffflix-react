// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';

import FETCH_MOVIES from 'Queries/fetchMovieList';
import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import InfiniteScroll from 'Components/InfiniteScroll';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { ErrorWrap } from 'Components/Error/Styles';
import { NoResults } from 'Containers/Styles';
import { LibraryListItem } from '../Styles';

type Props = {
    sModal: Function,
    sortOrder: String,
    sortDirection: String
};

const RenderMovieList = ({ sModal, sortOrder, sortDirection }: Props) => {
    const toggleModal = () => {
        sModal(LIBRARY_MODAL, {
            title: 'Add Movies Library',
            type: 'movies',
        });
    };

    const moviesLimit = (window.innerHeight > 1100) ? 100 : 50;

    const { loading, error, data, refetch, fetchMore } = useQuery(FETCH_MOVIES, {
        variables: {
            limit: moviesLimit,
            offset: 0,
            sort: sortOrder,
            sortDirection
        },
    });

    useEffect(() => {
        refetch({
            limit: moviesLimit,
            offset: 0,
            sort: sortOrder,
            sortDirection
        })
    }, [sortDirection, sortOrder]);

    if (loading) return <Loading />;
    if (error) return <ErrorWrap style={{ marginLeft: '1rem' }}>{`Error! ${error.message}`}</ErrorWrap>;

    if (data.movies.length) {
        return (
            <InfiniteScroll
                id="content"
                threshold={500}
                onLoadMore={() =>
                    fetchMore({
                        variables: {
                            offset: data.movies.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            return {
                                ...prev,
                                movies: [
                                    ...prev.movies,
                                    ...fetchMoreResult.movies.filter(
                                        (item) => !prev.movies.some((prevItem) => prevItem.uuid === item.uuid),
                                    ),
                                ],
                            };
                        },
                    })
                }
            >
                {() => {
                    return data.movies.map((m) => {
                        const { files, name, title, playState, posterPath, type, uuid, year } = m;

                        return (
                            <LibraryListItem key={m.uuid}>
                                <MediaCard
                                    files={files}
                                    name={name}
                                    title={title}
                                    playState={playState}
                                    posterPath={posterPath}
                                    type={type}
                                    uuid={uuid}
                                    year={year}
                                />
                            </LibraryListItem>
                        );
                    });
                }}
            </InfiniteScroll>
        );
    }

    return (
        <NoResults>
            You currently have no Movies.
            <button type="button" onClick={() => toggleModal()}>
                Add a Movies folder
            </button>
        </NoResults>
    );
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(RenderMovieList);
