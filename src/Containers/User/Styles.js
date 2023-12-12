import styled, { css } from 'styled-components';
import { aFadeIn, aFadeOut } from 'Styles/Animations';
import { media } from 'Styles/Utils';

const fadeIn = () => css`
    .5s ${aFadeIn} alternate;
`;

const fadeOut = () => css`
    .25s ${aFadeOut} forwards;
`;

export const UserFormWrap = styled.section`
    display: flex;
    width: 100%;
    margin: 0 auto;
    height: 100vh;
    align-self: center;
    flex-direction: column;
    background: ${(props) => props.theme.dark};
    animation: ${(props) => (props.success ? fadeOut : fadeIn)};

    ${media.tablet`
        background:none;
        height:auto;
        max-width: 50rem;
    `};
`;

export const LoginForm = styled.section`
    color: #fff;
    background: rgb(30, 31, 45);
    animation: ${(props) => (props.success ? fadeOut : fadeIn)};
`;