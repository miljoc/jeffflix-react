import styled, { keyframes } from 'styled-components';
import { media } from 'Styles/Utils';
import { NavLink } from 'react-router-dom';
import { rgba } from 'polished';
import { HeadingOneStyle, HeadingThreeStyle, HeadingFourStyle, HeadingFiveStyle, LightParagraph, ParagraphBaseStyle } from 'Styles/Base';

const fadeInLow = keyframes`
    from { opacity: 0 }
    to { opacity: .05 }
`;

export const MediaFullWrap = styled.section`
    float: left;
    width: 100%;
    padding: 3rem 2.5rem;
    position: relative;
    display: flex;
    z-index: 4;
    flex-wrap: wrap;

    &:after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        opacity: 0.3;
        z-index: -1;
        pointer-events: none;
        background: #2e2f41;
    }

    ${media.desktop`
        padding:5rem 3.5rem;
    `}

    ${media.large`
        padding:5rem;
    `}
`;

export const MediaLeftCol = styled.div`
    float: left;
    width: 25%;
    min-width: 20rem;
    max-width: 25rem;
    margin-right: 2.5rem;
    display: none;

    ${media.tablet`
        display:block;
    `}
`;

export const MediaRightCol = styled.div`
    float: left;
    flex: 1;
    position: relative;

    ${media.tablet`
        padding-left: 2.5rem;
        display:block;
    `}
`;

export const MediaName = styled.h1`
    ${HeadingFourStyle}
    color:${(props) => props.theme.white};
    width:100%;
    margin:0 0 1.5rem;
    line-height:1.4;
    padding-right: 5rem;
    transform: translateY(-0.5rem);

    ${media.mobile`
        margin:0 0 2rem;
    `}

    ${media.tablet`
        ${HeadingThreeStyle}
    `}

    ${media.large`
        ${HeadingOneStyle}
    `}
`;

export const MediaNameLink = styled(NavLink)`
    ${HeadingFourStyle}
    color:${(props) => props.theme.white};
    float:left;
    width:100%;
    margin:0 0 1.5rem;
    line-height:2.6rem;
    padding-right: 6rem;
    font-weight:600;

    &:hover {
        text-decoration:underline;
    }

    ${media.mobile`
        margin:0 0 2rem;
    `}

    ${media.tablet`
        font-size: ${(props) => props.theme.typography.headingThree};
    `}

    ${media.large`
        font-size: ${(props) => props.theme.typography.headingOne};
    `}
`;

export const MediaEpisodes = styled.div`
    font-size: ${(props) => props.theme.typography.base};
    margin-top: 1rem;
`;

export const SeasonNumber = styled.h3`
    ${ParagraphBaseStyle}
    color: ${(props) => rgba(props.theme.white, 0.7)};
    float: left;
    width: 100%;
    margin: -1rem 0 1rem;
    line-height: 2rem;

    span {
        float: none !important;
        width: auto !important;
        margin-left: 1rem !important;
    }

    ${media.tablet`
        margin:-1rem 0 2rem;
    `}

    ${media.large`
        font-size: ${(props) => props.theme.typography.body};
        margin:0 0 2rem;
    `}
`;

export const SubTitle = styled.h3`
    font-size: ${(props) => props.theme.typography.body};
    color: ${(props) => props.theme.white};
    float: left;
    width: 100%;
    margin: 0 0 2rem;
    padding: 2rem 0.5rem 0;
    border-top: 1px solid ${(props) => rgba(props.theme.white, 0.05)};
`;

export const MediaRelease = styled.span`
    font-size: ${(props) => props.theme.typography.small};
    color: ${(props) => props.theme.secondary};
    opacity: 0.5;
    font-weight: 400;
    float: left;
    width: 100%;
    margin-left: 0;

    ${media.tablet`
        font-size: ${(props) => props.theme.typography.body};
        float:none;
        width:auto;
        margin-left: 1rem;
    `}
`;

export const MediaOverview = styled.p`
    ${LightParagraph}
    float: left;
    width: 100%;
    margin: 0 0 2rem;

    span {
        color: ${(props) => props.theme.primary};
        margin-left: 1rem;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const MediaBackground = styled.span`
    background: url(${(props) => props.bgimg}) no-repeat center;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(25px);
    opacity: 0;
    animation: 0.3s ${fadeInLow} forwards;
    animation-delay: 0.3s;
    display: none;
    pointer-events: none;

    ${media.mobile`
        display:block;
    `}
`;

export const MediaOriginalTitle = styled.div`
    ${HeadingFourStyle}
    margin-bottom: 2rem;
    color: ${(props) => props.theme.white};

    > span {
        ${HeadingFiveStyle}
        display: block;
        color: inherit;
        opacity: .5;
        font-weight: 600;
        line-height: 2rem;
        letter-spacing: 0.1rem;
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
`;