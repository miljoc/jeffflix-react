import React from 'react';
import { compose } from 'lodash/fp';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactToolTip from 'react-tooltip';
import PropTypes from 'prop-types';
import { Auth } from 'Client/Auth';
import { showModal } from 'Redux/Actions/modalActions';

import PlayMedia from './PlayMedia';
import MarkWatched from './MarkWatched';
import RefreshMetadata from './RefreshMetadata';
import MediaMismatch from './MediaMismatch';
import AdvancedInfo from './AdvancedInfo';

import { Header } from './Styles';

const MediaItemHeader = ({ name, type, uuid, playMedia, playState, file, files, isConnected }) => (
    <Header>
        <ReactToolTip effect="solid" place="left" className="tooltip" />
        <PlayMedia type={type} isConnected={isConnected} playMedia={playMedia} playState={playState} />
        <MarkWatched playState={playState} type={type} uuid={uuid} />
        <AdvancedInfo files={files} type={type} name={name} />
        {Auth.isAdmin.admin && (
            <>
                <RefreshMetadata uuid={uuid} />
                {type === 'Movie' && <MediaMismatch uuid={file.uuid} name={name} type={type} file={file.filePath} />}
            </>
        )}
    </Header>
);

MediaItemHeader.propTypes = {
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    file: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        filePath: PropTypes.string.isRequired,
    }),
    files: PropTypes.arrayOf(
        PropTypes.shape({
            fileName: PropTypes.string,
            filePath: PropTypes.string,
            fileSize: PropTypes.number.isRequired
        }),
    ).isRequired,
    playState: PropTypes.shape({
        finished: PropTypes.bool,
        playtime: PropTypes.number,
    }).isRequired,
    isConnected: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    playMedia: PropTypes.func.isRequired,
};

MediaItemHeader.defaultProps = {
    file: null,
};

const mapDispatchToProps = (dispatch) => ({
    sModal: (type, props) => dispatch(showModal(type, props)),
});

export default compose(
    withRouter,
    connect(
        null,
        mapDispatchToProps,
    ),
)(MediaItemHeader);
