// @flow
import React from 'react';
import { useQuery } from '@apollo/client';

import FETCH_EPISODE from 'Queries/fetchEpisode';
import Loading from 'Components/Loading';
import MediaItem from 'Components/Media/MediaItem';

type Props = {
    uuid: ?string,
};

type Episode = {
    episode: Object,
};

const RenderEpisode = ({ uuid }: Props) => {
    const { loading, error, data } = useQuery<Episode, Props>(FETCH_EPISODE, {
        variables: { uuid },
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error && error.message}`;
    if (!data) return `Error fetching data for this episde.`;

    const { stillPath, airDate, season, type, name, playState, files, overview, episodeNumber } = data.episode;

    return (
        <MediaItem
            wide
            uuid={uuid}
            tmdbID={season.series.tmdbID}
            airDate={airDate}
            posterPath={stillPath}
            season={season}
            type={type}
            name={name}
            playState={playState}
            files={files}
            overview={overview}
            episodeNumber={episodeNumber}
            seasonNumber={season.seasonNumber}
        />
    );
};

export default RenderEpisode;
