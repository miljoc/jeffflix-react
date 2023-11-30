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
            <HeadingFour>Verderkijken</HeadingFour>
            <RenderContinueWatching />
        </CarouselWrap>
        <CarouselWrap>
            <HeadingFour>Recent Toegevoegde Films</HeadingFour>
            <RenderRecentMovies />
        </CarouselWrap>
        <CarouselWrap>
            <HeadingFour>Recent Toegevoegde Afleveringen</HeadingFour>
            <RenderRecentEpisodes />
        </CarouselWrap>
        <CarouselWrap>
            <HeadingFour>Omdat je &quot;GRAPHQL_RAND_WATCHED_TITLE&quot; hebt gekeken</HeadingFour>
        </CarouselWrap>
    </DashboardWrap>
);

export default Dashboard;
