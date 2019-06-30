import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Script from 'react-load-script';

import CastControls from './CastControls';
import { castStatusCheck } from './castActions';

class CastPlayer extends Component {
    handleScriptLoad = () => {
        const { isCasting, isPlaying } = this.props;

        const initializeCastApi = () => {
            cast.framework.CastContext.getInstance().setOptions({
                receiverApplicationId: 'EA238E27',
                autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
            });
        };

        // eslint-disable-next-line
        window['__onGCastApiAvailable'] = (isAvailable) => {
            if (isAvailable) {
                initializeCastApi();
                castStatusCheck(isCasting, isPlaying);
            }
        };
    };

    render() {
        const { isCasting, isPlaying } = this.props;

        return (
            <Fragment>
                <Script
                    url="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
                    onLoad={() => this.handleScriptLoad()}
                />
                {isCasting && isPlaying && <CastControls {...this.props} />}
            </Fragment>
        );
    }
}

CastPlayer.propTypes = {
    isCasting: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const { cast } = state;

    return {
        isCasting: cast.connected,
        isPlaying: cast.playing,
        metadata: cast.metadata,
        playstate: cast.playstate,
    };
};

export default connect(
    mapStateToProps,
    null,
)(CastPlayer);
