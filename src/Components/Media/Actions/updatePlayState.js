import FETCH_SERIES from 'Queries/fetchSeries';
import FETCH_SEASON from 'Queries/fetchSeason';
import FETCH_EPISODE from 'Queries/fetchEpisode';
import FETCH_MOVIE from 'Queries/fetchMovie';

export const updatePlayStateSeries = (mutate, seriesUuid, uuid, finished) => {
    mutate({
        variables: { uuid, playtime: 0, finished },
        update: (store) => {
            const data = store.readQuery({
                query: FETCH_SERIES,
                variables: { uuid: seriesUuid },
            });

            data.series[0].seasons.forEach((s, i) => {
                data.series[0].seasons[i] = {
                    ...s,
                    unwatchedEpisodesCount: finished ? 0 : s.episodes.length,
                };
            });

            store.writeQuery({
                query: FETCH_SERIES,
                variables: { uuid: seriesUuid },
                data,
            });
        },
    }).catch((err) => err);
};

export const updatePlayStateSeason = (mutate, seasonUuid, uuid, finished) => {
    mutate({
        variables: { uuid, playtime: 0, finished },
        update: (store, { data: { createPlayState } }) => {
            const { playState } = createPlayState;
            const data = store.readQuery({
                query: FETCH_SEASON,
                variables: { uuid: seasonUuid },
            });

            data.season.episodes.forEach((e, i) => {
                data.season.episodes[i] = {
                    ...e,
                    playState: {
                        ...e.playState,
                        ...playState,
                    },
                };
            });

            store.writeQuery({
                query: FETCH_SEASON,
                variables: { uuid: seasonUuid },
                data,
            });
        },
    }).catch((err) => err);
};

export const updatePlayStateEpisode = (mutate, uuid, playtime, finished) => {
    mutate({
        variables: { uuid, playtime: !finished ? playtime : 0, finished },
        update: (store, { data: { createPlayState } }) => {
            const { playState } = createPlayState;
            const data = store.readQuery({
                query: FETCH_EPISODE,
                variables: { uuid },
            });

            // hacky fix for PlayStateResponse being returned as 'type'
            /* eslint no-underscore-dangle: 0 */
            data.episode.type = 'episode';
            data.episode.season.episodes[data.episode.episodeNumber - 1].__typename = 'Episode';

            store.writeQuery({
                query: FETCH_EPISODE,
                variables: { uuid },
                data: {
                    episode: {
                        ...data.episode,
                        playState: {
                            ...data.episode.playState,
                            ...playState,
                        },
                    },
                },
            });
        },
    }).catch((err) => err);
};

export const updatePlayStateMovie = (mutate, uuid, playtime, finished) => {
    mutate({
        variables: { uuid, playtime: !finished ? playtime : 0, finished },
        update: (store, { data: { createPlayState } }) => {
            const { playState } = createPlayState;
            const data = store.readQuery({
                query: FETCH_MOVIE,
                variables: { uuid },
            });

            data.movies[0].type = 'Movie';

            store.writeQuery({
                query: FETCH_MOVIE,
                variables: { uuid },
                data: {
                    movies: [
                        {
                            ...data.movies[0],
                            playState: {
                                ...data.movies[0].playState,
                                ...playState,
                            },
                        },
                    ],
                },
            });
        },
    }).catch((err) => err);
};
