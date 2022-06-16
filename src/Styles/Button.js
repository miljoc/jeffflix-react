import styled, { css } from "styled-components";
import { media } from 'Styles/Utils';
import { ErrorWrap } from 'Components/Error/Styles';
import { Badge } from 'Styles/Base';
import FlexCenter from 'Styles/Helpers';
import { BackIcon, NavIcon } from "../Components/Header/Styles";

const ButtonBase = css`
    cursor: pointer;
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    border: none;
    text-align: center;
    font-weight: 600;
    opacity: 1;
    border-radius: ${(props) => props.theme.button.borderRadius};
    font-size: ${(props) => props.theme.typography.base};
    height: 4rem;

    &:disabled {
        pointer-events: none;
    }
`;

const HeaderButton = css`
    float: ${(props) => (props.alignLeft ? 'left' : 'right')};
    background: none;
    border: none;
    transition: ${(props) => props.theme.base.transitionSpeed} background;
    width: ${(props) => props.theme.layout.header};
    height: ${(props) => props.theme.layout.header};

    &:hover {
        ${BackIcon}, ${NavIcon} {
            color: ${(props) => props.theme.white};
        }
    }
`;

export const BackButton = styled.button`
    ${HeaderButton}
    margin-right: 0.5rem;
`;

export const NavButton = styled.button`
    ${HeaderButton}
    
    ${(props) => props.hasCount && css`
        position: relative;
        ${FlexCenter}

        ${Badge} {
            position: absolute;
            top: 0.5rem;
            padding: 0;
            left: 0;
            color: ${props.theme.dark};
        }
    `}
`;

export const ButtonWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
    text-align: ${(props) => props.right ? 'right' : 'left'};
    flex-direction: column;
    width: 100%;

    ${media.tablet`
        flex-direction: row;
    `}

    ${ErrorWrap} {
        padding: 0;
        margin-top: 0;
        margin-bottom: 1rem;
        height: 25px;

        ${media.tablet`
            margin-bottom: 0;
        `}
    }
`;

export default ButtonBase;