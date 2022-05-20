import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { ParagraphBaseStyle } from 'Styles/Base';

export const SearchWrap = styled.form`
    position: relative;
    float: left;
    width: 100%;
`;

export const Button = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    height: 4rem;
    border: none;
    padding: 0 1.5rem;
    background: #0c0d16;
    font-weight: 600;
    color: ${(props) => props.theme.white};
    border-radius: 0 ${(props) => props.theme.button.borderRadius} ${(props) => props.theme.button.borderRadius} 0;
    transition: ${(props) => props.theme.base.transitionSpeed} background;
    min-width: 8rem;

    :hover {
        background: #0f1019;
    }

    :disabled {
        opacity: 0.8;
        cursor: not-allowed;
        color: ${(props) => rgba(props.theme.white, 0.2)};

        :hover {
            background: #0c0d16;
        }
    }
`;

export const MediaList = styled.div`
    background: ${(props) => rgba(props.theme.white, 0.03)};
    border-radius: ${(props) => props.theme.button.borderRadius};
    padding: 0.5rem;

    button {
        ${ParagraphBaseStyle}
        color: ${(props) => props.theme.white};
        display: flex;
        line-height: 3.5rem;
        width: 100%;
        cursor: pointer;
        padding: 0 2rem 0 1rem;
        color: ${(props) => props.theme.primary};
        background: none;
        border: none;

        span {
            color: ${(props) => props.theme.white};
            margin-left: auto;
        }

        &:hover {
            background: ${(props) => rgba(props.theme.black, 0.15)}
        }
    }
`;

export const renderThumb = ({ style }) => {
    const thumbStyle = {
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '2px',
    };

    return <div style={{ ...style, ...thumbStyle }} />;
};

export const renderTrack = ({ style }) => {
    const trackStyle = {
        width: '0.5rem',
        right: '0.5rem',
        top: '0',
        padding: '0.25rem 0',
        height: '100%',
    };

    return <div style={{ ...style, ...trackStyle }} />;
};

renderTrack.propTypes = {
    style: PropTypes.shape({}).isRequired,
};

renderThumb.propTypes = {
    style: PropTypes.shape({}).isRequired,
};
