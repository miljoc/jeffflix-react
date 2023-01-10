import styled, { css } from 'styled-components';
import { aFadeIn } from 'Styles/Animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { media } from 'Styles/Utils';
import LazyLoad from 'react-lazyload';

import placeholder from './placeholder.png';
import { rgba } from 'polished';
import { ParagraphBaseStyle, Badge } from 'Styles/Base';

export const Placeholder = styled.img`
    float: left;
    width: 100%;

    height: ${(props) => (props.wide ? '16rem' : props.theme.card.paddingTop)};

    ${media.tablet`
        height: ${(props) => (props.wide ? '13rem' : props.theme.card.paddingTop)};
    `}

    ${media.desktop`
        height: ${(props) => (props.wide ? props.theme.wideCard.paddingTop : props.theme.card.paddingTop)};
        ${(props) => props.wideLibrary && css`
            height: ${props.theme.wideCardLibrary.paddingTop};
        `};
    `}
`;

export const CardWrap = styled.article`
    width: 100%;
    position: relative;
    animation: 0.4s ${aFadeIn} alternate;
    z-index: 1;
`;

export const PosterWrap = styled.div`
    display: block;
    position: relative;
    background-color: #191e30;
    background-image: url(${placeholder});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    box-shadow: 0 15px 25px ${(props) => rgba(props.theme.black, 0.3)};
    float: left;
    width: 100%;
    overflow: hidden;
    border-radius: ${(props) => props.theme.card.borderRadius};
`;

export const Lazy = styled(LazyLoad)`
    padding-top: ${(props) => (props.wide ? '16rem' : props.theme.card.paddingTop)};

    ${media.tablet`
        padding-top: ${(props) => (props.wide ? '13rem' : props.theme.card.paddingTop)};
    `}

    ${media.desktop`
        padding-top: ${(props) => (props.wide ? props.theme.wideCard.paddingTop : props.theme.card.paddingTop)};
        ${(props) => props.wideLibrary && css`
            padding-top: ${props.theme.wideCardLibrary.paddingTop};
        `};
    `}
`;

export const CardPoster = styled.span`
    width: 100%;
    float: left;
    padding: 0.2rem 0.2rem 0;
    background-image: url(${(props) => (props.bgimg ? props.bgimg : placeholder)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding-top: ${(props) => (props.wide ? '16rem' : props.theme.card.paddingTop)};
    position: relative;
    z-index: 1;
    opacity: 0;
    animation: 0.3s ${aFadeIn} forwards;
    animation-delay: 0.3s;
    filter: grayscale(0) saturate(125%);
    pointer-events: none;
    border-radius: ${(props) => props.theme.card.borderRadius};

    ${PosterWrap}:hover & {
        filter: ${(props) => (props.hover ? 'grayscale(25%) saturate(75%)' : 'grayscale(0) saturate(125%)')};
    }

    ${props => props.immediate && css`
        animation: none;
        opacity: 1;
    `}

    ${media.tablet`
        padding-top: ${(props) => (props.wide ? '13rem' : props.theme.card.paddingTop)};
    `}

    ${media.desktop`
        padding-top: ${(props) => (props.wide ? props.theme.wideCard.paddingTop : props.theme.card.paddingTop)};
        ${(props) => props.wideLibrary && css`
            padding-top: ${props.theme.wideCardLibrary.paddingTop};
        `};
    `}

`;

export const CardTitle = styled.h3`
    ${ParagraphBaseStyle}
    width: 100%;
    float: left;
    text-align: left;
    margin: 1.5rem 0 0;
    color: ${(props) => props.theme.white};
    font-family: ${(props) => props.theme.fonts.body};
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-right: 2rem;
    line-height: 2.2rem;

    &:hover {
        text-decoration: underline;
    }
`;

export const CardInfo = styled.span`
    font-size: ${(props) => props.theme.typography.small};
    margin-top: 0.4rem;
    width: 100%;
    float: left;
    text-align: left;
    color: ${(props) => rgba(props.theme.white, .46)};
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-right: 2rem;
    line-height: 1.2rem;
`;

export const Unwatched = styled.span`
    position: absolute;
    top: -2.5rem;
    left: -0.75rem;
    width: 1rem;
    height: 7rem;
    z-index: 6;
    transform: rotate(45deg);
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    background: ${(props) => props.theme.primary};
    animation: 0.3s ${aFadeIn} alternate;
 
    ${PosterWrap}:hover & {
        transform: translateY(-5rem) translateX(-5rem);
    }
`;

export const UnwatchedCount = styled(Badge)`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    box-shadow: 0 0 25px ${(props) => rgba(props.theme.black, 0.5)};
    background: ${(props) => props.theme.primary};
    transition: ${(props) => props.theme.base.transitionSpeed} all;

    ${PosterWrap}:hover & {
        transform: translateY(-5rem) translateX(5rem);
    }
`;

export const PlayState = styled.span`
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    width: calc(100% - 1rem);
    background: ${(props) => props.theme.black};
    height: 0.7rem;
    z-index: 6;
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    overflow: hidden;
    border-radius: 0.5rem;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 0.5rem;
        margin: 0.1rem;
        border-radius: ${(props) => props.theme.base.borderRadius} 0 0 ${(props) => props.theme.base.borderRadius};
        width: ${(props) => props.percent}%;
        min-width: 1%;
        background: ${(props) => props.theme.primary};
    }

    ${PosterWrap}:hover & {
        transform: translateY(2rem);
    }
`;

export const CardPopup = styled.div`
  content:'';
  position:absolute;
  top:-1.25px;
  left:-1.25px;
  width:calc(100% + 2.5px);
  height:calc(100% + 2.5px);
  z-index: 1;
  opacity:0;
  pointer-events:none;
  transition:.2s opacity;
  overflow:hidden;

  &:before {
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0) 0%,rgba(0,0,0,0.9) 100%);
    opacity:.75;
  }

  ${PosterWrap}:hover & {
    opacity:1;
    pointer-events:initial;
    cursor:pointer;
  }
`;

export const PopupLink = styled.span`
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) scale(0.5);
    display: block;
    width: 5rem;
    height: 5rem;
    z-index: 10;
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    background: ${(props) => rgba(props.theme.black, 0.5)};
    border: 2px solid ${(props) => props.theme.white};

    ${PosterWrap}:hover & {
        transform: translateY(-50%) translateX(-50%) scale(1);
    }

    &:hover {
        border-color: ${(props) => props.theme.primary};
    }
`;

export const PopupIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.white};
    font-size: ${(props) => props.theme.typography.body};
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    position: absolute;
    top: 50%;
    left: calc(50% + 1px);
    transform: translateY(-50%) translateX(-50%);

    ${PopupLink}:hover & {
        color: ${(props) => props.theme.primary};
    }
`;

export const ResumeOption = styled.button`
    background: none;
    width: 100%;
    border: none;
    padding: 0;
    text-align: left;
    color: ${(props) => rgba(props.theme.white, 0.38)};
    line-height: 4rem;
    font-size: ${(props) => props.theme.typography.body};
    transition: ${(props) => props.theme.base.transitionSpeed} all;

    &:hover {
        color: ${(props) => props.theme.white};
    }
`;
