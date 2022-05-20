import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { aFadeInUp } from 'Styles/Animations';
import { rgba } from 'polished';
import { ParagraphBaseStyle } from 'Styles/Base';

export const DropdownContents = styled.div`
    position: absolute;
    top: 4rem;
    right: 0;
    background: ${(props) => props.theme.white};
    width: 17.5rem;
    border-radius: ${(props) => props.theme.button.borderRadius};
    box-shadow: 0 0 25px ${(props) => rgba(props.theme.black, 0.3)};
    padding: 0.5rem;

    &:after {
        top: -1rem;
        right: 1.5rem;
        border: solid transparent;
        content: '';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(213, 213, 213, 0);
        border-bottom-color: ${(props) => props.theme.white};
        border-width: 5px;
    }

    span,
    button {
        ${ParagraphBaseStyle}
        width: 100%;
        float: left;
        line-height: 4rem;
        padding: 0 2rem;
        color: ${(props) => props.theme.background};
        text-align: right;
        cursor: pointer;
        transition: ${(props) => props.theme.base.transitionSpeed} opacity;
        opacity: 0.7;
        border: 0;
        border-bottom: 1px solid #eee;
        background: none;

        &:last-child {
            border-radius: 0 0 ${(props) => props.theme.button.borderRadius} ${(props) => props.theme.button.borderRadius};
            border-bottom: 0;
        }

        &:first-child {
            border-radius: 0 0 ${(props) => props.theme.button.borderRadius} ${(props) => props.theme.button.borderRadius};
        }

        &:hover {
            opacity: 1;
        }
    }

    button:disabled {
        opacity: 0.3;
        cursor: initial;

        &:hover {
            opacity: 0.3;
        }
    }
`;

export const DropdownToggle = styled.span`
    display: block;
    width: 4rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    cursor: pointer;
`;

export const DropdownIcon = styled(FontAwesomeIcon)`
    font-size: ${(props) => props.theme.typography.headingThree};
    z-index: 11;
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    color: ${(props) => (props.isOpen ? props.theme.primary : props.theme.white)};

    &:hover {
        color: ${(props) => props.theme.primary};
    }
`;
