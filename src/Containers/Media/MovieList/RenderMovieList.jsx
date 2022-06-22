// @flow
import React, { createRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';

import FETCH_MOVIES from 'Queries/fetchMovieList';
import { showModal, LIBRARY_MODAL } from 'Redux/Actions/modalActions';

import Loading from 'Components/Loading';

import { ErrorWrap } from 'Components/Error/Styles';
import { NoResults } from 'Containers/Styles';

import Library, { itemsPerPage } from '../Library';

type Props = {
    sModal: Function,
    sortOrder: String,
    sortDirection: String,
    count: Number
};

const RenderMovieList = ({ sModal, sortOrder, sortDirection, count }: Props) => {
    const listRef = createRef();
    // const [columnCount, setColumnCount] = useState(null);

    const toggleModal = () => {
        sModal(LIBRARY_MODAL, {
            title: 'Add Movies Library',
            type: 'movies',
        });
    };

    const { loading, error, data, refetch, fetchMore } = useQuery(FETCH_MOVIES, {
        variables: {
            limit: itemsPerPage,
            offset: 0,
            sort: sortOrder,
            sortDirection
        },
    });

    useEffect(() => {
        refetch({
            limit: itemsPerPage,
            offset: 0,
            sort: sortOrder,
            sortDirection
        });

        // scroll to the top when you change the sort / direction
        listRef.current?.scrollToItem({ rowIndex: 0 });
    }, [sortDirection, sortOrder]);

    if (loading) return <Loading />;
    if (error) return <ErrorWrap style={{ marginLeft: '1rem' }}>{`Error! ${error.message}`}</ErrorWrap>;

    const loadMoreItems = (startIndex, stopIndex) => {
        const limit = stopIndex > (startIndex + itemsPerPage) ? stopIndex - startIndex : itemsPerPage;

        if( stopIndex < count){
            return fetchMore({
                variables: {
                    offset: startIndex,
                    limit
                }
            });
        }

        return false;
    };

    if (data.movies) {
        return (
            <Library
                count={count}
                data={data.movies}
                loadMoreItems={loadMoreItems}
                debounceAmount={300}
                listRef={listRef}
                // setColumnCount={setColumnCount}
            />
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
