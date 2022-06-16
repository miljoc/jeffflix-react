import styled, { css, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { media } from 'Styles/Utils';
import FlexCenter from 'Styles/Helpers';
import { HeadingFour, Badge } from 'Styles/Base';
import { rgba } from 'polished';

const fadeInLeft = keyframes`
  from {
    opacity:0;
    left:0;
  }
  to {
    opacity:1;
    left: ${(props) => props.theme.layout.sidebar};
    ${media.desktop`
        left:0;
    `}
   }
`;

export const HeaderWrap = styled.header`
    height: auto;
    float: left;
    width: 100%;
    z-index: 5;
    padding: 2rem 1rem 0;
    display: flex;
    align-items: center;

    .right-menu {
        display: flex;
        align-items: center;
        margin-left: auto;
    }

    google-cast-launcher {
        float: left;
        background: none;
        border: none;
        width: 5rem;
        height: 5rem;
        padding: 1.3rem;
        cursor: pointer;
        transform: translateY(-0.1rem);
    }

    ${media.desktop`
        padding:4rem 2rem 0;
    `}

    ${media.large`
        padding:4rem 3rem 0;
    `}
`;

export const NavIcon = styled(FontAwesomeIcon)`
    color: ${(props) => rgba(props.theme.white, 0.5)};
    font-size: ${(props) => props.theme.typography.headingThree};
    transition: ${(props) => props.theme.base.transitionSpeed} all;
`;

export const BackIcon = styled(FontAwesomeIcon)`
    color: ${(props) => rgba(props.theme.white, 0.5)};
    font-size: ${(props) => props.theme.typography.headingThree};
    transition: ${(props) => props.theme.base.transitionSpeed} all;
`;

export const HideNavIconWrap = styled.div`
    ${FlexCenter}
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    width: 5rem !important;
    height: 5rem;
    margin: 1.7rem 1rem;
    cursor: pointer;
`;

export const HideNavIcon = styled(FontAwesomeIcon)`
    height: 2.5rem;
    color: ${(props) => props.theme.white};
`;

export const ContentOverlay = styled.div`
    position: fixed;
    top: 0;
    left: ${(props) => props.theme.layout.sidebar};
    width: 100%;
    height: 100%;
    background: rgba(13, 14, 26, 0.8);
    z-index: 6;
    animation: 0.2s ${fadeInLeft} alternate;
    transition: ${(props) => props.theme.base.transitionSpeed} all;

    ${media.desktop`
        left: 0;
    `}
`;

export const SortWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    flex-basis: 100%;
    z-index: 5;

    ${media.desktop`
        flex-basis: 70%;
    `}

    > div {
        ${media.desktop`
            flex-basis: 15rem;
            flex-grow: 0;
        `}

        &:first-of-type {
            margin-right: 1.5rem;
            ${media.desktop`
                flex-basis: 20rem;
            `}
        }
    }
`;

export const StatsContent = styled.div`
    ${HeadingFour} {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.white};
        margin-bottom: 2rem;

        ${media.desktop`
            margin-bottom: 0;
        `}
        
        ${Badge} {
            margin-left: 0.8rem;
        }
    }
`;