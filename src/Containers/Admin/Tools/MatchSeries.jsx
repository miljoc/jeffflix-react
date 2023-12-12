// @flow
import React, { createRef, useMemo, useRef, useState } from 'react';
import { InnerContent } from 'Containers/Styles';
import { useQuery } from '@apollo/client';
import FETCH_UNIDENTIFIED_EPISODES from 'Queries/fetchUnidentifiedEpisodes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showModal, MATCH_MODAL } from 'Redux/Actions/modalActions';

import Loading from 'Components/Loading';

import InfiniteScroll from 'Components/InfiniteScroll';
import { MediaOverview } from 'Components/Media/Styles';
import { PageHeading } from 'Styles/Base';
import { MatchContainer, StickyButton, UncheckButton, MatchButton } from './Styles';
import CheckboxList from '../../../Components/CheckboxList';

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

    const uncheckAll = () => {
        episodesChecked.forEach(e => {
            refsById[e.index].ref.current.checked = false;
        });

        setEpisodesChecked(() => []);
        previousChecked.current = null;
    }
    
    const openModal = () => {
        sModal(MATCH_MODAL, {
            uuid: episodesChecked.map(e => e.uuid),
            file: episodesChecked,
            type: "Episode",
            name: episodesChecked[0].fileName
        });
    };

    if (loading) return <Loading />;
    if (error) return `Uhooh! ${error.message}`;

    return (
        <InnerContent>
            <PageHeading>Ongeidentificeerde afleveringen</PageHeading>
            {data.unidentifiedEpisodeFiles.length > 0 && (
                <StickyButton>
                    <UncheckButton
                        onClick={uncheckAll}
                        disabled={episodesChecked.length === 0}
                    >Uncheck Alles
                    </UncheckButton>
                    <MatchButton
                        onClick={openModal}
                        disabled={episodesChecked.length === 0}
                    >Match Afleveringen
                    </MatchButton>
                </StickyButton>
            )}
            <MatchContainer>
                <MediaOverview>
                    {data.unidentifiedEpisodeFiles.length === 0
                        ? "Alles is geidentificeerd, lekker bezig!"
                        : "Selecteer de afleveringen om ze te matchen en aan de bibliotheek toe te voegen"
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
                    {() => (
                        <CheckboxList
                            refsById={refsById}
                            files={data.unidentifiedEpisodeFiles}
                            episodesChecked={episodesChecked}
                            setEpisodesChecked={setEpisodesChecked}
                        />
                    )}
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