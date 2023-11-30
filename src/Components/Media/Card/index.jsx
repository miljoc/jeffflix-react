/* eslint react/jsx-props-no-spreading: ["off"] */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBaseUrl, generateMediaUrl } from 'Helpers';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { showModal, RESUME_MODAL } from 'Redux/Actions/modalActions';

import { faPlay, faSearch } from '@fortawesome/free-solid-svg-icons';
import MediaInfo from './MediaInfo';
import MediaName from './MediaName';

import { Placeholder, placeholder } from './Placeholder';
import { CardPoster, CardWrap, CardPopup, PosterWrap, PopupLink, PopupIcon, Lazy } from './Styles';

class MediaCard extends Component {
    constructor() {
        super();

        this.state = {
            url: '',
        };
    }

    componentDidMount() {
        const { type, uuid } = this.props;

        this.setState({
            url: generateMediaUrl(type, uuid),
        });
    }

    resumeModal = () => {
        const { url } = this.state;

        const { loadModal, history, playMedia, playState } = this.props;

        loadModal(RESUME_MODAL, {
            title: 'Kijken Hervatten',
            url,
            history,
            playMedia,
            playState,
        });
    };

    cardClick = (e, url, history, showPlayStatus) => {
        const { playState, playMedia, internalCard, hover } = this.props;

        if (!hover) return false;

        if (showPlayStatus) {
            if (
                (e.target.tagName === 'DIV'
                || e.target.tagName === 'H3'
                || e.target.tagName === "SPAN")
                && !internalCard
            ) {
                history.push(url);
                return true;
            }

            if (playState.playtime > 0 && !playState.finished) {
                this.resumeModal();
            } else if (internalCard) {
                playMedia();
            } else {
                history.push({
                    pathname: url,
                    state: { autoplay: true },
                });
            }
        } else {
            history.push(url);
        }

        return false;
    };

    render() {
        const {
            wide,
            wideLibrary,
            showText,
            history,
            name,
            title,
            posterPath,
            stillPath,
            type,
            files,
            hover
        } = this.props;
        const { url } = this.state;

        const showPlayStatus = type === 'Movie' || type === 'Episode';
        const bgImage =
            stillPath || posterPath
                ? `${getBaseUrl()}/m/images/tmdb/w342/${stillPath || posterPath}`
                : placeholder;

        let length;
        if (typeof files === 'undefined' || !(files instanceof Array)) {
            length = 0;
        } else if (files[0]) {
            length = files[0].totalDuration;
        }

        return (
            <>
                <CardWrap onClick={(e) => this.cardClick(e, url, history, showPlayStatus)}>
                    <PosterWrap title={name}>
                        <Lazy
                            wide={wide}
                            wideLibrary={wideLibrary}
                            height={0}
                            debounce={100}
                            placeholder={<Placeholder wideLibrary={wideLibrary} wide={wide} />}
                            overflow
                            resize
                        >
                            <CardPoster hover={hover} wide={wide} wideLibrary={wideLibrary} bgimg={bgImage}>
                                <MediaInfo {...this.props} length={length} showPlayStatus={showPlayStatus} />
                            </CardPoster>
                        </Lazy>
                        {hover && (
                            <CardPopup>
                                <PopupLink>
                                    <PopupIcon icon={showPlayStatus ? faPlay : faSearch} />
                                </PopupLink>
                            </CardPopup>
                        )}
                    </PosterWrap>
                    {showText && <MediaName name={name} title={title} {...this.props} />}
                </CardWrap>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadModal: (type, props) => dispatch(showModal(type, props)),
});

MediaCard.propTypes = {
    playMedia: PropTypes.func,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    airDate: PropTypes.string,
    posterPath: PropTypes.string,
    stillPath: PropTypes.string,
    type: PropTypes.string.isRequired,
    uuid: PropTypes.string,
    loadModal: PropTypes.func.isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            totalDuration: PropTypes.number,
        }),
    ),
    playState: PropTypes.shape({
        playtime: PropTypes.number,
        finished: PropTypes.bool,
    }),
    internalCard: PropTypes.bool,
    history: ReactRouterPropTypes.history.isRequired,
    hover: PropTypes.bool,
    wide: PropTypes.bool,
    wideLibrary: PropTypes.bool,
    showText: PropTypes.bool,
};

MediaCard.defaultProps = {
    title: null,
    airDate: null,
    hover: true,
    posterPath: null,
    stillPath: null,
    wide: null,
    wideLibrary: null,
    playMedia: null,
    showText: true,
    internalCard: null,
    playState: null,
    uuid: '',
    files: [
        {
            totalDuration: 0,
        },
    ],
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps,
    )(MediaCard),
);
