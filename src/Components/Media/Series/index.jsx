import React from 'react';
import PropTypes from 'prop-types';

import { getBaseUrl } from 'Helpers';

import Media from 'Components/Media/Card';

import {
  MediaFullWrap,
  MediaLeftCol,
  MediaRightCol,
  MediaName,
  SubTitle,
  MediaRelease,
  MediaOverview,
  MediaBackground,
} from '../Styles';
import SeasonsWrap from './Styles';

const Series = (props) => {
  const {
    name,
    posterPath,
    overview,
    firstAirDate,
    children,
    series,
  } = props;

  const releaseYear = firstAirDate.split('-')[0];
  const overviewCheck = (overview.length > 0 ? overview : series.overview);
  
  return (
    <MediaFullWrap>
      <MediaBackground bgimg={`${getBaseUrl()}/m/images/tmdb/w342/${posterPath}`} />
      <MediaLeftCol>
        <Media size="large" {...props} hover={false} />
      </MediaLeftCol>
      <MediaRightCol>
        <MediaName>
          {name}
          <MediaRelease>
            (
            {releaseYear}
            )
          </MediaRelease>
        </MediaName>
        <MediaOverview>{(overviewCheck.length > 255 ? `${overviewCheck.substring(0, 255)}...` : overviewCheck)}</MediaOverview>
        <SubTitle>Seasons</SubTitle>
        <SeasonsWrap>
          {children}
        </SeasonsWrap>
      </MediaRightCol>
    </MediaFullWrap>
  );
};

Series.propTypes = {
  name: PropTypes.string.isRequired,
  seasons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  })).isRequired,
  overview: PropTypes.string.isRequired,
};

export default Series;
