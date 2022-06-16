import styled, { css } from "styled-components";
import { media } from 'Styles/Utils';
import { CardWrap } from "Components/Media/Card/Styles";
import FlexCenter from "Styles/Helpers";
import { HeadingTwoStyle, HeadingThreeStyle, HeadingFiveStyle, LightParagraph } from 'Styles/Base';
import { rgba } from "polished";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SessionsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media screen and (min-width: 1800px) {
        justify-content: flex-start;
    }

`;

export const ProgressBarWrap = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    transition: height ${(props) => props.theme.base.transitionSpeed};
    border-radius: ${(props) => props.theme.base.borderRadius} ${(props) => props.theme.base.borderRadius} 0 0;
    overflow: hidden;
    width: 100%;
    background-color: ${(props) => rgba(props.theme.white,0.2)} !important;
    height: 1.5rem;

    > span:after {
        opacity: 1;
    }

    ${media.desktop`
        height: 0.5rem;
        > span:after {
            opacity: 0;
        }
    `}
`;


export const SessionWrap = styled.div`
    position: relative;
    display: flex;
    border-radius: ${props => props.theme.base.borderRadius};
    box-shadow: 0 15px 25px ${(props) => rgba(props.theme.black, 0.1)};
    padding: 3rem 2rem 2rem;
    background-color: ${(props) => props.theme.background};
    margin: 0 0 3rem;
    width: calc(100% - 1rem);
    flex-direction: column;

    ${media.tablet`
        width: calc(100% / 2 - 1rem);        
        margin: 0 0 2rem;
    `}

    @media screen and (min-width: 1400px) {
        flex-direction: row;        
    }

    @media screen and (min-width: 1800px) {
        width: calc(100% / 3 - 2rem);

        &:not(:last-of-type) {
            margin-right: 2rem;
        }
    }

    ${CardWrap} {
        width: 18rem;
    }

    &:hover {
        ${ProgressBarWrap} {
            height: 1.5rem;

            > span:after {
                opacity: 1;
            }
        }
    }
`;

export const SessionTitle = styled.h2`
    ${HeadingTwoStyle}
    color: ${props => props.theme.white};
    margin-bottom: 2rem;
    max-width: calc(100% - 5rem);

    a {
        color: ${props => props.theme.white};
        transition: ${(props) => props.theme.base.transitionSpeed} all;
        
        &:hover {
            color: ${props => props.theme.primary};
        }
    }
`;

export const SessionSubtitle = styled.span`
    display: block;
    ${LightParagraph}

    a {
        ${LightParagraph}
    }
`;

export const SessionInfo = styled.div`
    margin-top: 2rem;

    @media screen and (min-width: 1400px) {
        margin-left: 2rem;
        margin-top: 0;
    }
`;

export const Stream = styled.div`
    margin: 1.5rem 0;
`;

export const SessionLineHeading = styled.h3`
    font-size: ${(props) => props.theme.typography.headingFour};
    color: ${props => props.theme.white};
    margin-bottom: 0.4rem;

    span {
        display: inline;
        ${HeadingFiveStyle}
        font-family: ${props => props.theme.fonts.body};
        color: ${props => rgba(props.theme.white, 0.5)};
        font-weight: 700 !important;
        letter-spacing: 0.1rem;
        margin-left: 1rem;
    }
`;

export const SessionLine = styled.p`
    color: ${props => rgba(props.theme.white, 0.5)};
    font-size: ${(props) => props.theme.typography.base};
    line-height: 1.4;
    font-weight: 500 !important;

    span {
        font-weight: 700;
        color: ${props => props.theme.white};
    }
`;

export const SessionBottomInfo = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 2rem;

    ${SessionLine} {
        user-select: none;
        color: ${props => rgba(props.theme.white, 0.2)};
    }
`;

export const UserLine = styled.div`
    ${HeadingFiveStyle}
    color: ${props => rgba(props.theme.white, 0.3)};
    font-weight: 700;
    letter-spacing: 0.1rem;
    margin-bottom: 0.4rem;

    span {
        color: ${props => rgba(props.theme.white, 0.7)};
    }
`;

export const TranscodeInfoLine = styled.span`
    svg {
        display: inline-block;
        margin-left: 0.3rem;
        cursor: pointer;
    }
`;

export const SessionState = styled.div`
    position: absolute;
    ${FlexCenter}
    top: 3rem;
    right: 2rem;
    width: 2rem;
    height: 2rem;
    color: ${props => rgba(props.theme.white, 0.5)};

    svg {
        width: auto;
        height: 100%;
    }
`;