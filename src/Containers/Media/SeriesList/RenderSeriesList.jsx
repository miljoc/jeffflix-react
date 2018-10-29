import React from 'react';
import { Query } from 'react-apollo';
import { orderBy } from 'lodash';
import FETCH_SERIES_LIST from 'Queries/fetchSeriesList';

import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { LibraryListItem } from '../Styles';

const RenderSeriesList = () => (
  <Query
    query={FETCH_SERIES_LIST}
  >

    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return `Error! ${error.message}`;

      return orderBy(data.series, ['name'], ['asc']).map(s => (
        <LibraryListItem key={s.uuid}>
          <MediaCard {...s} />
        </LibraryListItem>
      ));
    }}
  </Query>
);

export default RenderSeriesList;
