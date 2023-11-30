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
    viewOptions: Array,
    setView: Function,
    view: String,
    type: String
};

const Sort = ({
    sortDirection,
    sortOrder,
    setSortOrder,
    setSortDirection,
    sortDirections,
    sortValues,
    viewOptions,
    setView,
    view,
    type
}: Props) => {    
    return (
        <SortWrap>
            <SingleSelect
                placeholder="Bekijk"
                options={viewOptions}
                onChange={(val) => {
                    setLocalStorage(val, `${type}-viewType`);
                    setView(val);
                }}
                value={view}
                name="viewType"
            />
            <SingleSelect
                placeholder="Sorteer op"
                options={sortValues}
                onChange={(val) => {
                    setLocalStorage(val, `${type}-sortOrder`);
                    setSortOrder(val);
                }}
                value={sortOrder}
                name="type"
            />
            <SingleSelect
                placeholder="Volgorde"
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


