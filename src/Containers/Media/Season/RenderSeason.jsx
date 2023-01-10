// @flow
import React from 'react';
import { useQuery } from '@apollo/client';
import { orderBy } from 'lodash';

import FETCH_SEASON from 'Queries/fetchSeason';

import Empty from 'Components/Media/Card/Empty';
import Loading from 'Components/Loading';
import Season from 'Components/Media/Season';
import MediaCard from 'Components/Media/Card';

import * as S from '../Styles';

type Props = {
    uuid: string,
};

const RenderSeason = ({ uuid }: Props) => {
    const { loading, error, data } = useQuery(FETCH_SEASON, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    const { name, posterPath, airDate, overview, episodes, series, type, seasonNumber } = data.season;

    const episodeList = orderBy(episodes, ['episodeNumber'], ['asc']);
    
    const episodeListRender = episodeList.map((item) => {
        const { stillPath, type: etype, name: ename, playState, files, uuid: euuid, episodeNumber } = item;
        return (
            <S.LibraryListItemWide key={euuid}>
                <MediaCard
                    files={files}
                    name={ename}
                    playState={playState}
                    episodeNumber={episodeNumber}
                    posterPath={stillPath}
                    type={etype}
                    uuid={euuid}
                    wide
                    showText
                />
            </S.LibraryListItemWide>
        );
    });

    return (
        <Season
            name={name}
            airDate={airDate}
            overview={overview}
            episodes={episodeList}
            series={series}
            uuid={uuid}
            posterPath={posterPath}
            type={type}
            tmdbID={series.tmdbID}
            seasonNumber={seasonNumber}
        >
            {episodeListRender}
            <Empty wide />
        </Season>
    );
};

export default RenderSeason;
