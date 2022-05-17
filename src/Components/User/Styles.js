import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { aHeadShake } from 'Styles/Animations';
import { media } from 'Styles/Utils';
import { rgba } from 'polished';
import { ParagraphBaseStyle } from 'Styles/Base';
import ButtonBase from 'Styles/Button';

const shake = () => css`
    .5s ${aHeadShake} alternate;
`;

export const FormWrap = styled.form`
    padding: 3rem;
    background: ${(props) => props.theme.white};
    margin: 1rem;
    transition: ${(props) => props.theme.base.transitionSpeed} border;
    border-radius: 0.2rem;
    border: 1px solid;
    border-color: ${(props) => (props.error ? props.theme.alerts.error : 'transparent')};
    animation: ${(props) => (props.error ? shake : 'none')};

    ${media.tablet`
      padding:5rem;
      margin:3rem;
      box-shadow: 0 10px 60px ${(props) => rgba(props.theme.black, 0.3)};
    `};
`;

// Heading
export const Heading = styled.h1`
    font-size: ${(props) => props.theme.typography.headingOne};
    line-height: 1.5;
    margin: 3rem 0 0;
    color: ${(props) => props.theme.dark};
`;

export const SubHeading = styled.p`
    font-size: ${(props) => props.theme.typography.body};
    font-weight: 600;
    margin: 0 0 3rem;
    color: ${(props) => props.theme.text};
`;

// Form Elements
export const InputWrap = styled.div`
    float:left;
    width:100%;
    position:relative;
    padding-bottom: .2rem;
    margin:0 0 2rem;
    border: 1px solid;
    border-bottom: 0px;
    border-color: ${(props) => (!props.isValid ? rgba(props.theme.black, 0.2) : props.theme.alerts.error)};

    &:after, &:before {
        content:'';
        position:absolute;
        height: .1rem;
        bottom:-1px;
        left:-1px;
        z-index:3;
        width: calc(100% + 2px);
        transition: 0.3s width;
    }

    &:after {
        background: ${(props) => (props.error ? props.theme.alerts.error : rgba(props.theme.black,0.2) )};
    }

    &:before {
        z-index:4;
        width:${(props) => (props.isFocused ? 'calc(100% + 2px)' : '0%')};
        background: ${(props) => props.theme.primary};
    }
`;

export const TextInput = styled.input`
    ${ParagraphBaseStyle}
    height: 4rem;
    border: 0;
    width: 100%;
    float: left;
    text-indent: 1.5rem;
    background: ${(props) => props.theme.white};
    color: ${(props) => props.theme.dark};

    &:-webkit-autofill {
        box-shadow: 0 0 0 100px ${(props) => props.theme.white} inset;
        -webkit-box-shadow: 0 0 0 100px ${(props) => props.theme.white} inset;
    }

    &:-webkit-autofill {
        -webkit-text-fill-color: ${(props) => props.theme.dark};
    }

    &:focus {
        outline: none;
    }
`;

export const FormButton = styled.button`
    ${ButtonBase}
    height: 4rem;
    color: ${(props) => props.theme.white};
    width: 100%;
    background: ${(props) => props.theme.dark};
    font-weight: 700;
    letter-spacing: 0.1rem;
    text-transform: uppercase;

    &:disabled {
        filter: grayscale(100%);
        opacity: 0.2;
    }

    &:hover {
        background: ${(props) => props.theme.lighten.background};
    }

    &:focus {
        outline: none;
    }
`;

// Register
export const FormLinkPara = styled.p`
    font-size: ${(props) => props.theme.typography.base};
    color: ${(props) => props.theme.text};
    font-weight:600;
    text-align:center;
    margin: 2rem 0 0;
`;

export const Links = styled(Link)`
    color: ${(props) => props.theme.primary};
    margin-left: 0.5rem;
    font-weight: 700;

    &:hover {
        text-decoration: underline;
    }
`;

// Forgot Password
export const ForgotPasswordLink = styled(Link)`
    text-decoration: underline;
    color: ${(props) => props.theme.text};
    margin: 0 auto;
    transition: 0.3s color;
    font-weight: 600;

    &:hover {
        color: ${(props) => props.theme.primary};
    }
`;

export const Help = styled.span`
    ${ParagraphBaseStyle}
    padding: 1.5rem;
    background: ${(props) => props.theme.alerts.error};
    box-shadow: 0 10px 60px ${(props) => rgba(props.theme.black, 0.3)};
    margin: 0 3rem;
    transition: ${(props) => props.theme.base.transitionSpeed} border;
    border-radius: ${(props) => props.theme.button.borderRadius};
    border: 1px solid;
    text-align: left;
    color: ${(props) => props.theme.white};
    line-height: 2rem;
    border: 1px solid ${(props) => props.theme.alerts.error};
`;
