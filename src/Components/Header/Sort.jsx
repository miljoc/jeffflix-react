import React from 'react';
import { SingleSelect } from 'Components/Form';

import { SortWrap } from './Styles';

type Props = {
    setSortDirection: Function,
    setSortOrder: Function,
    sortOrder: String,
    sortDirection: String,
    sortValues: Array,
    sortDirections: Array
};

const Sort = ({ sortOrder, sortDirection, setSortDirection, setSortOrder, sortDirections, sortValues }: Props) => {
    
    return (
        <SortWrap>
            <SingleSelect
                placeholder="Sort by"
                options={sortValues}
                onChange={(val) => {
                    const newVal = val;
                    setSortOrder(newVal);
                }}
                value={sortOrder}
                name="type"
            />
            <SingleSelect
                placeholder="Order"
                options={sortDirections}
                onChange={(val) => {
                    const newVal = val;
                    setSortDirection(newVal);
                }}
                value={sortDirection}
                name="sortDirection"
            />
        </SortWrap>
    )
};

export default Sort;


