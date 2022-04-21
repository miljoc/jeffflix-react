import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { media } from 'Styles/Utils';

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

    .right-menu {
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
    color: rgba(255, 255, 255, 0.5);
    font-size: 2rem;
    transition: 0.2s all;
`;

export const BackIcon = styled(FontAwesomeIcon)`
    color: rgba(255, 255, 255, 0.5);
    font-size: 2rem;
    transition: 0.2s all;
`;

export const HideNavIcon = styled(FontAwesomeIcon)`
    color: #fff;
    font-size: 1.6rem;
    transition: 0.2s all;
    width: 5rem !Important;
    height: 5rem;
    margin: 1.7rem 1rem;
    padding: 1.5rem;
    cursor: pointer;
`;

export const BackButton = styled.button`
    float: ${(props) => (props.alignLeft ? 'left' : 'right')};
    background: none;
    border: none;
    transition: 0.2s background;
    width: ${(props) => props.theme.layout.header};
    height: ${(props) => props.theme.layout.header};
    margin-right: 0.5rem;

    &:hover {
        ${BackIcon} {
            color: #fff;
        }
    }
`;

export const NavButton = styled.button`
    float: ${(props) => (props.alignLeft ? 'left' : 'right')};
    background: none;
    border: none;
    transition: 0.2s background;
    width: ${(props) => props.theme.layout.header};
    height: ${(props) => props.theme.layout.header};

    &:hover {
        ${NavIcon} {
            color: #fff;
        }
    }
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
    transition: 0.2s all;

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
    h4 {
        display: flex;
        align-items: center;
        font-size: 1.8rem;
        color: #fff;
        margin-bottom: 2rem;

        ${media.desktop`
            margin-bottom: 0;
        `}
        
        span {
            display: inline-block;
            margin-left: 0.8rem;
            background: ${(props) => props.theme.primary};
            border-radius: 0.2rem;
            font-family: ${(props) => props.theme.fonts.muli};
            font-size: 1.2rem;
            padding: 0.4rem 0.8rem 0.5rem;
        }
    }
`;