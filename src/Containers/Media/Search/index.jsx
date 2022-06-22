// @flow
import React from 'react';
import { useParams } from 'react-router';

import RenderSearchResults from './RenderSearchResults';

import { LibraryListWrap } from '../Styles';

const Search = () => (
    <LibraryListWrap>
        <RenderSearchResults value={useParams().value} />
    </LibraryListWrap>
);

export default Search;
