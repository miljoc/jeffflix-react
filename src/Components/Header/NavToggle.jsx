import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactToolTip from 'react-tooltip';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { hideNavigation, showNavigation } from 'Redux/Actions/navigationActions';

import { NavButton } from 'Styles/Button';
import { NavIcon, ContentOverlay, HideNavIcon, HideNavIconWrap } from './Styles';

class NavToggle extends Component {
    componentDidMount() {
        window.addEventListener('resize', this.responsiveTrigger.bind(this));
        this.responsiveTrigger();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.responsiveTrigger.bind(this));
    }

    toggleNav = () => {
        const { sNavigation, hNavigation, navHidden } = this.props;

        if (navHidden) {
            sNavigation();
        } else {
            hNavigation();
        }
    };

    responsiveTrigger() {
        const { hNavigation, browser } = this.props;

        if (browser.lessThan.large) hNavigation();
    }

    render() {
        const { navHidden, browser } = this.props;

        return (
            <>
                <ReactToolTip effect="solid" place="left" className="tooltip" />
                {browser.lessThan.large && !navHidden && (
                    <ContentOverlay
                        data-delay-show='1000'
                        data-tip={navHidden ? "Show Nav" : "Hide Nav"}
                        onClick={this.toggleNav}
                    >
                        <HideNavIconWrap>
                            <HideNavIcon icon={faTimes} />
                        </HideNavIconWrap>
                    </ContentOverlay>
                )}

                <NavButton
                    data-delay-show='1000'
                    data-tip={navHidden ? "Show Nav" : "Hide Nav"}
                    onClick={this.toggleNav}
                    alignLeft
                >
                    <NavIcon data-place="right" icon={navHidden ? faBars : faTimes} />
                </NavButton>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    const { navigation, browser } = state;
    return {
        navHidden: navigation.hidden,
        browser,
    };
};

const mapDispatchToProps = (dispatch) => ({
    hNavigation: () => dispatch(hideNavigation()),
    sNavigation: () => dispatch(showNavigation()),
});

NavToggle.propTypes = {
    navHidden: PropTypes.bool.isRequired,
    sNavigation: PropTypes.func.isRequired,
    hNavigation: PropTypes.func.isRequired,
    browser: PropTypes.shape({
        lessThan: PropTypes.shape({
            large: PropTypes.bool.isRequired,
        }).isRequired,
    }).isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavToggle);
