// @flow
import React from 'react';
import { InnerContent } from 'Containers/Styles';
import { useQuery } from 'react-apollo';
import FETCH_UNIDENTIFIED_MOVIES from 'Queries/fetchUnidentifiedMovies';

import Loading from 'Components/Loading';

import ReactTooltip from 'react-tooltip';
import { MediaOverview } from 'Components/Media/Styles';
import MovieMatch from 'Components/MediaMatch/MovieMatch';
import { PageHeading } from 'Styles/Base';
import { MatchLine, MatchContainer } from './Styles';

const MatchMovies = () => {
    const { error, loading, data } = useQuery(FETCH_UNIDENTIFIED_MOVIES);

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;
	
    const { unidentifiedMovieFiles } = data;

    return (
        <InnerContent>
            <ReactTooltip effect="solid" place="right" className="tooltip" />
            <PageHeading>Unidentified Movies</PageHeading>
            <MatchContainer>
                <MediaOverview>
                    {unidentifiedMovieFiles.length === 0
                        ? "No unmatched movies. Good for you!"
                        : "Click a movie below to match and add it to your library"
                    }
                </MediaOverview>

                {unidentifiedMovieFiles.length > 0 && unidentifiedMovieFiles.map(movie => {                
                    return (
                        <MatchLine key={movie.uuid}>
                            <MovieMatch uuid={movie.uuid} type="Movie" name={movie.fileName} file={movie.filePath} />
                        </MatchLine>
                    );
                })}
            </MatchContainer>
        </InnerContent>
    );
}

export default MatchMovies;