// @flow
import React from 'react';

import { HeadingFour } from 'Styles/Base';
import RenderRecentMovies from './RenderRecentMovies';
import RenderRecentEpisodes from './RenderRecentEpisodes';
import RenderContinueWatching from './RenderContinueWatching';

import { DashboardWrap, CarouselWrap } from './Styles';

const Dashboard = () => (
    <DashboardWrap>
        <CarouselWrap>
            <HeadingFour>Continue Watching</HeadingFour>
            <RenderContinueWatching />
        </CarouselWrap>
        <CarouselWrap>
            <HeadingFour>Recently Added Movies</HeadingFour>
            <RenderRecentMovies />
        </CarouselWrap>
        <CarouselWrap>
            <HeadingFour>Recently Added Episodes</HeadingFour>
            <RenderRecentEpisodes />
        </CarouselWrap>
    </DashboardWrap>
);

export default Dashboard;
