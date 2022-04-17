// @flow
import React from 'react';
import { InnerContent, PageHeading } from 'Containers/Styles';
import { useQuery } from 'react-apollo';
import FETCH_UNIDENTIFIED_MOVIES from 'Queries/fetchUnidentifiedMovies';

import Loading from 'Components/Loading';

import MediaMatch from 'Components/Media/MediaHeader/MediaMatch';
import ReactTooltip from 'react-tooltip';
import { InnerParagraph, MovieLine, MoviesWrap } from './Styles';

const MatchMovies = () => {
    const { error, loading, data } = useQuery(FETCH_UNIDENTIFIED_MOVIES);

    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;
	
    const { unidentifiedMovieFiles } = data ;

    return (
        <InnerContent>
            <ReactTooltip effect="solid" place="right" className="tooltip" />
            <PageHeading>Unidentified Movies</PageHeading>
            <InnerParagraph>Click a movie below to match and add it to your library</InnerParagraph>
            <MoviesWrap>
                {unidentifiedMovieFiles.length > 0 && unidentifiedMovieFiles.map(movie => {
                // console.log(movie.fileName);
                
                    return (
                        <MovieLine key={movie.uuid}>
                            <MediaMatch uuid={movie.uuid} type="Movie" name={movie.fileName} file={movie.filePath} />
                        </MovieLine>
                    );
                })}
            </MoviesWrap>
        </InnerContent>
    );
}

export default MatchMovies;