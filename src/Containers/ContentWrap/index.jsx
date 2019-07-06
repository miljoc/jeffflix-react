import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Scroll from 'Components/Scroll';

import Content from './Styles';

const ContentWrap = ({ children, navHidden, isCasting }) => (
    <Content navHidden={navHidden} isCasting={isCasting}>
        <Scroll navHidden={navHidden} id="content">
            {children}
        </Scroll>
    </Content>
);

const mapStateToProps = (state) => {
    const { navigation, cast } = state;

    return {
        navHidden: navigation.hidden,
        isCasting: cast.playing,
    };
};

ContentWrap.propTypes = {
    isCasting: PropTypes.bool.isRequired,
    navHidden: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
};

export default connect(
    mapStateToProps,
    null,
)(ContentWrap);
