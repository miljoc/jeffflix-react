import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedTime } from 'react-player-controls';

import { setCastPlaystate } from 'Redux/Actions/castActions';

import { SeekBarWrap, SeekBarSlider, SliderHandle, SliderBar } from './Styles';

class SeekBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSeeking: false,
            isEnabled: true,
            direction: 'HORIZONTAL',
            value: 0,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { isSeeking } = prevState;
        const { playtime, total } = nextProps.playstate;

        if (isSeeking) return {};

        return {
            value: playtime === 0 ? 0 : (100 * playtime) / total / 100,
        };
    }

    seeking = (value) => {
        const { setCastPlaystate, playstate } = this.props;

        this.setState({ value });

        setCastPlaystate({
            playtime: value * playstate.total,
        });
    };

    seekStart = () => {
        const { playPause, isPaused } = this.props;

        this.setState({ isSeeking: true });

        if (!isPaused) playPause();
    };

    seekEnd = (val) => {
        const { playPause, isPaused, seek } = this.props;
        const { isSeeking } = this.state;

        if (isPaused) playPause();
        if (isSeeking) seek(val);

        this.setState({ isSeeking: false });
    };

    render() {
        const { playstate } = this.props;
        const { direction, isEnabled, value } = this.state;

        return (
            <SeekBarWrap>
                <FormattedTime numSeconds={playstate.playtime} />
                <SeekBarSlider
                    direction={direction}
                    isEnabled={isEnabled}
                    onChangeStart={() => this.seekStart()}
                    onChange={(newValue) => this.seeking(newValue)}
                    onChangeEnd={(endValue) => this.seekEnd(endValue * playstate.total)}
                >
                    <SliderBar direction={direction} value={value} />
                    <SliderHandle direction={direction} value={value} />
                </SeekBarSlider>

                <FormattedTime numSeconds={playstate.total} />
            </SeekBarWrap>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCastPlaystate: (playstate) => dispatch(setCastPlaystate(playstate)),
});

export default connect(
    null,
    mapDispatchToProps,
)(SeekBar);
