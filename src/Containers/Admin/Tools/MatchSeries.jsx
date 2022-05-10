// @flow
import React, { useMemo, useState } from 'react';
import { InnerContent, PageHeading } from 'Containers/Styles';
import { useQuery } from 'react-apollo';
import FETCH_UNIDENTIFIED_EPISODES from 'Queries/fetchUnidentifiedEpisodes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showModal, MATCH_MODAL } from 'Redux/Actions/modalActions';

import Loading from 'Components/Loading';

import InfiniteScroll from 'Components/InfiniteScroll';
import { MediaOverview } from 'Components/Media/Styles';
import EpisodeMatch from 'Components/MediaMatch/EpisodeMatch';
import { Button, MatchLine, MatchContainer, StickyButton, UncheckButton } from './Styles';

const MatchSeries = ({ sModal }) => {
    const [episodesChecked, setEpisodesChecked] = useState([]);
    
    const { error, loading, data, fetchMore } = useQuery(FETCH_UNIDENTIFIED_EPISODES, {
        variables: {
            limit: 50,
            offset: 0,
        },
    });

    const refsById = useMemo(() => {
        const refs = {}
        if(data?.unidentifiedEpisodeFiles.length > 0){
            data?.unidentifiedEpisodeFiles.forEach((episode) => {
                refs[episode.uuid] = React.createRef(null)
            })
        }
        return refs
    }, [data]);

    const handleCheckboxChange = event => {
        setEpisodesChecked(oldEpisodes => {
            const fileObj = {
                filePath: event.target.dataset.filepath,
                fileName: event.target.dataset.filename,
                uuid: event.target.id,
                checked: event.target.checked
            };
            let newArray = [ ...oldEpisodes, fileObj ];
            if ( oldEpisodes.some(e => e.uuid === event.target.id) ) {
                newArray = newArray.filter(episode => episode.uuid !== fileObj.uuid);
            }
            return newArray;
        });
    };

    const openModal = () => {
        sModal(MATCH_MODAL, {
            uuid: episodesChecked.map(e => e.uuid),
            file: episodesChecked,
            type: "Episode",
            name: episodesChecked[0].fileName
        });
    };

    const uncheckAll = () => {
        episodesChecked.forEach(e => {
            refsById[e.uuid].current.checked = false;
        });
        setEpisodesChecked([]);
    }
    
    if (loading) return <Loading />;
    if (error) return `Error! ${error.message}`;

    return (
        <InnerContent>
            <PageHeading>Unidentified Episodes</PageHeading>
            {data.unidentifiedEpisodeFiles.length > 0 && (
                <StickyButton>
                    <UncheckButton
                        onClick={uncheckAll}
                        disabled={episodesChecked.length === 0}
                    >Uncheck All
                    </UncheckButton>
                    <Button
                        onClick={openModal}
                        disabled={episodesChecked.length === 0}
                    >Match Episodes
                    </Button>
                </StickyButton>
            )}
            <MatchContainer>
                <MediaOverview>
                    {data.unidentifiedEpisodeFiles.length === 0
                        ? "No unmatched episodes. Good for you!"
                        : "Select episodes below to match and add them to your library"
                    }
                </MediaOverview>

                <InfiniteScroll
                    id="content"
                    threshold={500}
                    onLoadMore={() =>
                        fetchMore({
                            variables: {
                                offset: data.unidentifiedEpisodeFiles.length,
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;

                                return {
                                    ...prev,
                                    unidentifiedEpisodeFiles: [
                                        ...prev.unidentifiedEpisodeFiles,
                                        ...fetchMoreResult.unidentifiedEpisodeFiles.filter(
                                            (item) => !prev.unidentifiedEpisodeFiles.some(
                                                (prevItem) => prevItem.uuid === item.uuid
                                            ),
                                        ),
                                    ],
                                };
                            },
                        })
                    }
                >
                    {() => {
                        return data.unidentifiedEpisodeFiles.map(({ uuid, filePath, fileName }) => {
                            return (
                                <MatchLine key={uuid}>
                                    <EpisodeMatch
                                        filePath={filePath}
                                        fileName={fileName}
                                        uuid={uuid}
                                        forwardedRef={refsById[uuid]}
                                        handleCheckboxChange={handleCheckboxChange}
                                    />
                                </MatchLine>    
                            );
                        });
                    }}
                </InfiniteScroll>
            </MatchContainer>
        </InnerContent>
    );
}

MatchSeries.propTypes = {
    sModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(MatchSeries);