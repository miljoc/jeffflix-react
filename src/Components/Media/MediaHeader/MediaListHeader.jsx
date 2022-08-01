import React, { Component } from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactToolTip from 'react-tooltip';
import PropTypes from 'prop-types';
import { Auth } from 'Client/Auth';

import { compileEpisodes, generateMediaUrl } from 'Helpers';
import { showModal } from 'Redux/Actions/modalActions';

import { faPlay, faRandom } from '@fortawesome/free-solid-svg-icons';
import { orderBy, flatten } from 'lodash';
import MediaMismatch from './MediaMismatch';
import MarkWatched from './MarkWatched';

import * as S from './Styles';
import RefreshMetadata from './RefreshMetadata';

class MediaListHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            episodes: [],
            nextEpisode: {},
            randomEpisode: {},
            finished: false,
        };
    }

    componentDidMount = () => {
        this.updateEpisodeList();
    };

    updateEpisodeList = () => {
        const { data, type } = this.props;

        const episodes = type === 'series' ? compileEpisodes(data) : data;
        const randomize = Math.floor(Math.random() * (episodes.length + 1));

        let nextEpisode = episodes[0];
        let finished = true;

        for (let i = 0; i < episodes.length; i += 1) {
            const el = episodes[i];

            if (!el.playState.finished) {
                nextEpisode = el;
                finished = false;
                break;
            }
        }

        this.setState({
            episodes,
            nextEpisode,
            finished,
            randomEpisode: episodes[randomize],
        });
    };

    playEpisode = (uuid, resume) => {
        const { history } = this.props;

        history.push({
            pathname: generateMediaUrl('episode', uuid),
            state: {
                resume,
                autoplay: true,
            },
        });
    };

    playSeries = () => {
        const { nextEpisode } = this.state;
        const resume = nextEpisode.playState.playtime > 0;

        this.playEpisode(nextEpisode.uuid, resume);
    };

    render() {
        const { finished, randomEpisode, episodes } = this.state;
        const { type, name, uuid } = this.props;

        const files = orderBy(
            flatten(episodes.map(e => {
                return e.files.map(f =>{
                    return {
                        uuid: f.uuid,
                        filePath: f.filePath,
                        fileName: f.fileName
                    }
                })
            })),
            ['filePath'],
            ['asc']
        );

        const playState = {
            finished,
        };

        return (
            <S.Header>
                <ReactToolTip effect="solid" place="left" className="tooltip" />
                <S.HeaderIconWrap
                    onClick={this.playSeries}
                    data-delay-show='1000'
                    data-tip={`Play ${type === 'series' ? 'Series' : 'Season'}`}
                >
                    <S.HeaderIcon icon={faPlay} />
                </S.HeaderIconWrap>

                <S.HeaderIconWrap
                    onClick={() => this.playEpisode(randomEpisode.uuid, false)}
                    data-delay-show='1000' 
                    data-tip="Play Random Episode"
                >
                    <S.HeaderIcon icon={faRandom} />
                </S.HeaderIconWrap>

                <MarkWatched type={type} uuid={uuid} playState={playState} episodes={episodes} />
                
                {Auth.isAdmin.admin && (
                    <>
                        <RefreshMetadata uuid={uuid} />
                        {episodes.length > 0 && type === 'series' && (
                            <MediaMismatch
                                uuid={uuid}
                                name={name}
                                file={files}
                                type="episode"
                            />
                        )}
                    </>
                )}

            </S.Header>
        );
    }
}

MediaListHeader.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            playState: PropTypes.shape({
                finished: PropTypes.bool.isRequired,
                playtime: PropTypes.number.isRequired,
            }),
        }),
    ).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    type: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string,
};

MediaListHeader.defaultProps = {
    name: '',
};

const mapDispatchToProps = (dispatch) => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
});

export default compose(
    withRouter,
    connect(
        null,
        mapDispatchToProps,
    ),
)(MediaListHeader);
