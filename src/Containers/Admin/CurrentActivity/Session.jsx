import React from 'react'
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import FETCH_FILE_LOCATOR from 'Queries/fetchFileLocator';
import Loading from 'Components/Loading';
import { ErrorWrap } from 'Components/Error/Styles';
import { CardWrap , PosterWrap , CardPoster, Lazy } from 'Components/Media/Card/Styles';
import { Placeholder , placeholder } from 'Components/Media/Card/Placeholder';
import { getBaseUrl , convertBitrate, generateMediaUrl } from 'Helpers';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'Styles/Base';
import ReactTooltip from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import {
    ProgressBarWrap,
    SessionInfo,
    SessionLine,
    SessionLineHeading,
    SessionState,
    SessionSubtitle,
    SessionTitle,
    SessionWrap,
    Stream,
    UserLine
} from './Styles';
import TranscodeInfo from './TranscodeInfo';

const Session = ({ session, user }) => {
    const { fileLocator, streams, paused, progress } = session;
    const { loading, data, error } = useQuery(FETCH_FILE_LOCATOR, {
        variables: {
            fileLocator
        }
    });

    if(loading) <Loading />
    if(error) <ErrorWrap>{`Error: ${error.message}`}</ErrorWrap>

    
    if(data){
        const { __typename: type, episode, movie } = data.getMediaFileFromFileLocator;
        const video = streams.find((s) => s.streamType === 'video');
        const audio = streams.find((s) => s.streamType === 'audio');
        const subtitle = streams.find((s) => s.streamType === 'subtitle');
        const posterPath = type === 'MovieFile'
            ? movie.posterPath
            : episode.season.posterPath || episode.season.series.posterPath;

        const bgImage =
            posterPath
                ? `${getBaseUrl()}/m/images/tmdb/w342/${posterPath}`
                : placeholder;

        const mediaType = type === 'MovieFile' ? 'movie' : 'episode';
        const uuid = type === 'MovieFile' ? movie.uuid : episode.uuid;

        return (
            <SessionWrap>
                <ReactTooltip effect="solid" place="right" className="tooltip tooltip-percentage" delayShow={0} />
                <Link to={generateMediaUrl(mediaType, uuid)}>
                    <CardWrap>
                        <PosterWrap>
                            <Lazy
                                height={0}
                                debounce={100}
                                placeholder={<Placeholder />}
                                overflow
                                resize
                            >
                                <CardPoster bgimg={bgImage} />
                            </Lazy>
                        </PosterWrap>
                    </CardWrap>
                </Link>
                <SessionInfo>
                    {user && <UserLine><span>{user.username}</span> is watching</UserLine>}
                    {type === 'EpisodeFile'
                        ? (
                            <SessionTitle>
                                <Link to={generateMediaUrl('series',episode.season.series.uuid)}>
                                    {episode.season.series.name} ({episode.season.series.firstAirDate.split("-")[0]})
                                </Link>
                                <SessionSubtitle>
                                    <Link to={generateMediaUrl('season',episode.season.uuid)}>
                                        {episode.season.name}
                                    </Link>,&nbsp;
                                    <Link to={generateMediaUrl('episode',episode.uuid)}>
                                        Episode {episode.episodeNumber} - {episode.name}
                                    </Link>
                                </SessionSubtitle>
                            </SessionTitle>
                        )
                        : (
                            <SessionTitle>
                                <Link to={generateMediaUrl('movie',movie.uuid)}>{movie.title} ({movie.year})</Link>
                            </SessionTitle>
                        )
                    }
                    <Stream key={video.streamID}>
                        <SessionLineHeading>
                            Video
                            <TranscodeInfo stream={video} />
                        </SessionLineHeading>
                        
                        <SessionLine>
                            {video.container} ({video.codecName} - {video.codecs})
                        </SessionLine>
                        <SessionLine>
                            {video.resolution} - {convertBitrate(video.bitRate)}
                        </SessionLine>
                    </Stream>
                    <Stream key={audio.streamID}>
                        <SessionLineHeading>
                            Audio
                            <TranscodeInfo stream={audio} />
                        </SessionLineHeading>
                        <SessionLine>
                            {audio.container} ({audio.language} - {audio.codecs})
                        </SessionLine>
                    </Stream>
                    {subtitle && (
                        <Stream key={subtitle.streamID}>
                            <SessionLineHeading>
                                Ondertiteling
                                <TranscodeInfo stream={subtitle} />
                            </SessionLineHeading>
                            <SessionLine>
                                {subtitle.language} - {subtitle.title}
                            </SessionLine>
                        </Stream>
                    )}
                </SessionInfo>
                <ProgressBarWrap>
                    <ProgressBar
                        width={progress}
                        text={`${progress}%`}
                    />
                </ProgressBarWrap>
                <SessionState>  
                    <FontAwesomeIcon icon={paused ? faPause : faPlay} data-tip={paused ? 'Gepauzeerd' : 'Afspelen'} />
                </SessionState>
            </SessionWrap>
        )
    }

    return <Loading />
}

Session.propTypes = {
    user: PropTypes.shape({
        admin: PropTypes.bool,
        id: PropTypes.number,
        username: PropTypes.string,
    }),
    session: PropTypes.shape({
        fileLocator: PropTypes.string,
        progress: PropTypes.number,
        paused: PropTypes.bool,
        sessionID: PropTypes.string,
        userID: PropTypes.number,
        streams: PropTypes.arrayOf(
            PropTypes.shape({
                transcodingPercentage: PropTypes.number,
                throttled: PropTypes.bool,
                transcoded: PropTypes.bool,
                transmuxed: PropTypes.bool,
                lastAccessed: PropTypes.string,
                container: PropTypes.string,
                resolution: PropTypes.string,
                codecs: PropTypes.string,
                codecName: PropTypes.string,
                streamType: PropTypes.string,
                language: PropTypes.string,
                title: PropTypes.string,
                bitRate: PropTypes.number,
                streamID: PropTypes.number,
                transcodingState: PropTypes.string,            
            })
        ),
    }).isRequired,
};

Session.defaultProps = {
    user: false
}

export default Session;