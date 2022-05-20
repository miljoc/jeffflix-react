// @flow
import React, { createRef, useMemo, useRef, useState } from 'react';
import { InnerContent } from 'Containers/Styles';
import { useQuery } from 'react-apollo';
import FETCH_UNIDENTIFIED_EPISODES from 'Queries/fetchUnidentifiedEpisodes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showModal, MATCH_MODAL } from 'Redux/Actions/modalActions';

import Loading from 'Components/Loading';

import InfiniteScroll from 'Components/InfiniteScroll';
import { MediaOverview } from 'Components/Media/Styles';
import EpisodeMatch from 'Components/MediaMatch/EpisodeMatch';
import { PageHeading } from 'Styles/Base';
import { MatchLine, MatchContainer, StickyButton, UncheckButton, MatchButton } from './Styles';

const MatchSeries = ({ sModal }) => {
    const [episodesChecked, setEpisodesChecked] = useState([]);
    const previousChecked = useRef();
    
    const { error, loading, data, fetchMore } = useQuery(FETCH_UNIDENTIFIED_EPISODES, {
        variables: {
            limit: 50,
            offset: 0,
        },
    });    

    const refsById = useMemo(() => {
        const refs = [];
        if(data?.unidentifiedEpisodeFiles.length > 0){
            data?.unidentifiedEpisodeFiles.forEach((episode, index) => {
                refs[index] = { uuid: episode.uuid, index, ref: createRef(null) }
            });
        }
        return refs;
    }, [data]);

    // 'current' is part of useRef, confusing. map it to "previous"
    const setEpisodesCheckedWithShift = ({ current: previous }, currentIndex) => {
        setEpisodesChecked(oldEpisodes => {
            let newArray = [];
            const prev = parseInt(previous, 10);
            const curr = parseInt(currentIndex, 10)

            const toCheck = curr < prev
                ? refsById.slice(curr, prev + 1)
                : refsById.slice(prev, curr + 1);

            toCheck.forEach(c => {
                refsById[c.index].ref.current.checked = true
                const fileObj = {
                    filePath: c.ref.current.dataset.filepath,
                    fileName: c.ref.current.dataset.filename,
                    uuid: c.uuid,
                    index: c.index,
                    checked: c.ref.current.checked
                };                    
                newArray = [...newArray, fileObj];
            });

            const finalArray = [...oldEpisodes, ...newArray];

            // make sure episodes are always unique
            return finalArray.filter((e, i) => finalArray.findIndex(a => a.uuid === e.uuid) === i);
        });
    }

    const handleCheckboxChange = (event) => {
        const { nativeEvent, target: { id, checked, dataset: { filepath, filename, index } } } = event;

        // check if shift key is selected
        if(nativeEvent.shiftKey){
            setEpisodesCheckedWithShift(previousChecked, index);
        }else if(checked){
            previousChecked.current = index;
        }
        
        // always add the latest checked
        setEpisodesChecked(oldEpisodes => {
            const fileObj = {
                filePath: filepath,
                fileName: filename,
                uuid: id,
                index,
                checked
            };
            const newArray = [ ...oldEpisodes, fileObj ];

            // make sure episodes are always unique
            return newArray.filter((e, i) => newArray.findIndex(a => a.uuid === e.uuid) === i);
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
            refsById[e.index].ref.current.checked = false;
        });

        setEpisodesChecked(() => []);
        previousChecked.current = null;
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
                    <MatchButton
                        onClick={openModal}
                        disabled={episodesChecked.length === 0}
                    >Match Episodes
                    </MatchButton>
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
                        return data.unidentifiedEpisodeFiles.map((episode, index) => {
                            return (
                                <MatchLine key={episode.uuid}>
                                    <EpisodeMatch
                                        episode={episode}
                                        index={index}
                                        checked={episodesChecked.filter(e => e.uuid === episode.uuid).length > 0}
                                        forwardedRef={refsById[index].ref}
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