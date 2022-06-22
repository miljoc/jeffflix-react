// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';

import FETCH_SERIES_LIST from 'Queries/fetchSeriesList';
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

const RenderSeriesList = ({ sModal, sortOrder, sortDirection }: Props) => {
    const toggleModal = () => {
        sModal(LIBRARY_MODAL, {
            title: 'Add TV Series folder',
            type: 'series',
        });
    };

    const seriesLimit = (window.innerHeight > 1100) ? 100 : 50;

    const { loading, error, data, refetch, fetchMore } = useQuery(FETCH_SERIES_LIST, {
        variables: {
            limit: seriesLimit,
            offset: 0,
            sort: sortOrder,
            sortDirection
        },
    });

    useEffect(() => {
        refetch({
            limit: seriesLimit,
            offset: 0,
            sort: sortOrder,
            sortDirection
        })
    }, [sortDirection, sortOrder]);    

    if (loading) return <Loading />;
    if (error) return <ErrorWrap style={{ marginLeft: '1rem' }}>{`Error! ${error.message}`}</ErrorWrap>;

    if (data.series.length) {
        return (
            <InfiniteScroll
                id="content"
                threshold={500}
                onLoadMore={() =>
                    fetchMore({
                        variables: {
                            offset: data.series.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;

                            return {
                                ...prev,
                                series: [
                                    ...prev.series,
                                    ...fetchMoreResult.series.filter(
                                        (item) => !prev.series.some((prevItem) => prevItem.uuid === item.uuid),
                                    ),
                                ],
                            };
                        },
                    })
                }
            >
                {() => {
                    return data.series.map((s) => {
                        const { name, posterPath, type, unwatchedEpisodesCount, uuid, firstAirDate } = s;

                        return (
                            <LibraryListItem key={s.uuid}>
                                <MediaCard
                                    name={name}
                                    posterPath={posterPath}
                                    type={type}
                                    unwatchedEpisodesCount={unwatchedEpisodesCount}
                                    uuid={uuid}
                                    year={firstAirDate.split("-")[0]}
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
            You currently have no Series.
            <button type="button" onClick={() => toggleModal()}>
                Add a Series folder
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
)(RenderSeriesList);
