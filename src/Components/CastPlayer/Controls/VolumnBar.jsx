import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedTime } from 'react-player-controls';

import { setCastPlaystate } from 'Redux/Actions/castActions';

import { SeekBarWrap, SeekBarSlider, SliderHandle, SliderBar } from './Styles';

class VolumnBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: true,
            isSeeking: false,
            direction: 'HORIZONTAL',
            value: 0,
        };
    }

    componentDidMount() {
        const { playstate } = this.props;

        this.setState({ value: playstate.volume });
    }

    static getDerivedStateFromProps(nextProps) {
        const { volume } = nextProps.playstate;

        return {
            value: volume,
        };
    }

    volumeChange = (value) => {
        const { setCastPlaystate } = this.props;

        this.setState({
            value,
            isSeeking: true,
        });

        setCastPlaystate({
            volume: value,
        });
    };

    volumeEnd = (value) => {
        const { setVolume } = this.props;
        const { isSeeking } = this.state;

        if (isSeeking) setVolume(value);

        this.setState({
            value,
            isSeeking: false,
        });
    };

    render() {
        const { playstate, isMuted } = this.props;
        const { direction, isEnabled, value } = this.state;

        return (
            <SeekBarWrap maxWidth={10} marginLeft={1}>
                <SeekBarSlider
                    direction={direction}
                    isEnabled={isEnabled}
                    onChange={(newValue) => this.volumeChange(newValue)}
                    onChangeEnd={(endValue) => this.volumeEnd(endValue)}
                >
                    <SliderBar direction={direction} value={value} isMuted={isMuted} />
                    <SliderHandle direction={direction} value={value} />
                </SeekBarSlider>
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
)(VolumnBar);
