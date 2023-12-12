// @flow
import React from 'react';
import { useQuery } from '@apollo/client';

import CONTINUE_WATCHING from 'Queries/fetchContinueWatching';

import Carousel from 'Components/Carousel';
import Loading from 'Components/Loading';
import MediaCard from 'Components/Media/Card';

import { NoResults } from 'Containers/Styles';
import { ErrorWrap } from 'Components/Error/Styles';
import { MediaCardWrap } from './Styles';

const RenderContinueWatching = () => {
    const { loading, error, data } = useQuery(CONTINUE_WATCHING, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Loading />;
    if (error) return <ErrorWrap marginLeft>{`Error! ${error.message}`}</ErrorWrap>;

    if (data.upNext.length === 0) {
        return <NoResults alignLeft>Je hebt nog niks gekeken, waarom start je niet wat?</NoResults>;
    }

    const continueWatching = data.upNext.map((item) => {
        if (item.name.length === 0) return false;

        const { files, name, playState, type, uuid, episodeNumber, season, year, title } = item;
        const posterPath = item.posterPath || item.season.series.posterPath;
        const seasonNumber = season && season.seasonNumber;

        return (
            <MediaCardWrap key={uuid}>
                <MediaCard
                    showText
                    files={files}
                    episodeNumber={episodeNumber}
                    seasonNumber={seasonNumber}
                    name={name}
                    playState={playState}
                    posterPath={posterPath}
                    type={type}
                    uuid={uuid}
                    title={title}
                    year={year}
                />
            </MediaCardWrap>
        );
    });

    return <Carousel>{continueWatching}</Carousel>;
};

export default RenderContinueWatching;
