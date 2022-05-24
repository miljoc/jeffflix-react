import React from 'react';
import { SingleSelect } from 'Components/Form';

import { setLocalStorage } from 'Helpers';
import { SortWrap } from './Styles';

type Props = {
    setSortDirection: Function,
    setSortOrder: Function,
    sortOrder: String,
    sortDirection: String,
    sortValues: Array,
    sortDirections: Array,
    type: String
};

const Sort = ({
    sortDirection,
    sortOrder,
    setSortOrder,
    setSortDirection,
    sortDirections,
    sortValues,
    type
}: Props) => {    
    return (
        <SortWrap>
            <SingleSelect
                placeholder="Sort by"
                options={sortValues}
                onChange={(val) => {
                    setLocalStorage(val, `${type}-sortOrder`);
                    setSortOrder(val);
                }}
                value={sortOrder}
                name="type"
            />
            <SingleSelect
                placeholder="Order"
                options={sortDirections}
                onChange={(val) => {
                    setLocalStorage(val, `${type}-sortDirection`);
                    setSortDirection(val);
                }}
                value={sortDirection}
                name="sortDirection"
            />
        </SortWrap>
    )
};

export default Sort;


