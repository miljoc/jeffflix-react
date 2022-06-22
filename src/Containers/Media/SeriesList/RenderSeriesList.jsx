// @flow
import React, { createRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';

import FETCH_SERIES_LIST from 'Queries/fetchSeriesList';
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

const RenderSeriesList = ({ sModal, sortOrder, sortDirection, count }: Props) => {
    const listRef = createRef();
    // const [columnCount, setColumnCount] = useState(null);

    const toggleModal = () => {
        sModal(LIBRARY_MODAL, {
            title: 'Add TV Series folder',
            type: 'series',
        });
    };

    const { loading, error, data, refetch, fetchMore } = useQuery(FETCH_SERIES_LIST, {
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

    if (data.series) {
        return (
            <Library
                count={count}
                data={data.series}
                loadMoreItems={loadMoreItems}
                debounceAmount={300}
                listRef={listRef}
                // setColumnCount={setColumnCount}
            />
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
