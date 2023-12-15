import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { GENERIC_MODAL, showModal } from 'Redux/Actions/modalActions';
import { TranscodeInfoLine } from './Styles';

function TranscodeInfo({ stream, loadModal }) {
    const sessionGlossary = `
        <p><strong>Transmux</strong> means the codec is compatible with the device
        you are playing on, however the container is not. Jeffflix is changing it into a proper
        container without changing the codecs.</p>
        <p><strong>Transcode</strong> means the codec is <em>not</em> compatible
        with the device and jeffflix needs to convert it to a proper codec.</p>
        <p><strong>Throttled</strong> means that jeffflix has built enough buffer
        for your client to keep watching without interruption, but it will start encoding
        again when the buffer is getting smaller.</p>
    `;

    return (
        <TranscodeInfoLine>
            {stream.transcoded ? 'Transcode' : 'Transmux'}
            {` (${stream.transcodingPercentage}%`}
            {stream.throttled === true && ' - throttled'})
            <FontAwesomeIcon
                icon={faInfoCircle}
                data-tip="Meer Informatie"
                data-delay-show={1000}
                onClick={() => {
                    loadModal(GENERIC_MODAL, {
                        title: `Glossary`,
                        icon: faInfoCircle,
                        message: sessionGlossary,
                    });                
                }}
            />
        </TranscodeInfoLine>
    )
};

TranscodeInfo.propTypes = {
    stream: PropTypes.shape({
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
    }).isRequired,
    loadModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    loadModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(TranscodeInfo);