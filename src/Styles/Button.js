import styled, { css } from "styled-components";
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
`;

export default ButtonBase;