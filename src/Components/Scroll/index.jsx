import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

import { scrolled, CONTENT_SCROLL, SIDEBAR_SCROLL } from 'Redux/Actions/viewportActions';

import * as S from './Styles';

class Scroll extends Component {
    constructor(props) {
        super(props);

        this.handleScroll = throttle(this.handleScroll.bind(this), 50);
    }

    handleScroll(values) {
        const { id, scrollFinished } = this.props;

        let type;

        if (id === 'content') {
            type = CONTENT_SCROLL;
        } else if (id === 'sidebar') {
            type = SIDEBAR_SCROLL;
        }
        scrollFinished(type, values);
    }

    render() {
        const { children } = this.props;

        return (
            <Scrollbars
                autoHide
                autoHeightMin="100%"
                renderThumbVertical={S.renderThumb}
                renderTrackVertical={S.renderTrack}
                onScrollFrame={this.handleScroll}
            >
                {children}
            </Scrollbars>
        );
    }
}

Scroll.propTypes = {
    children: PropTypes.element.isRequired,
    id: PropTypes.string.isRequired,
    scrollFinished: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    scrollFinished: (type, props) => dispatch(scrolled(type, props)),
});

export default connect(
    null,
    mapDispatchToProps,
)(Scroll);
