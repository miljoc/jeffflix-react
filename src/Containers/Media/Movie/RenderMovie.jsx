// @flow
import React from 'react';
import { useQuery } from '@apollo/client';

import FETCH_MOVIE from 'Queries/fetchMovie';
import Loading from 'Components/Loading';
import MediaItem from 'Components/Media/MediaItem';

type Props = {
    uuid: string,
};

const RenderMovie = ({ uuid }: Props) => {
    const { loading, error, data } = useQuery(FETCH_MOVIE, {
        variables: { uuid },
        fetchPolicy: "no-cache",
        nextFetchPolicy: "cache-first"
    });

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    
    const { posterPath, season, type, name, playState, files, overview, year, title, imdbID, tmdbID } = data.movies[0];
    
    return (
        <MediaItem
            uuid={uuid}
            tmdbID={tmdbID}
            imdbID={imdbID}
            posterPath={posterPath}
            season={season}
            type={type}
            name={name}
            title={title}
            playState={playState}
            files={files}
            overview={overview}
            year={year}
        />
    );
};

export default RenderMovie;
