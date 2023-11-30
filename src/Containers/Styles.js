import styled from 'styled-components';
import { media } from 'Styles/Utils';
import { ParagraphBaseStyle, LightParagraph } from 'Styles/Base';
import BG from 'Images/login-bg.jpg';

export const AppWrap = styled.main`
    display: flex;
    height: 100vh;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: ${(props) => (props.authed ? 'initial' : 'center')};
    overflow: hidden;
`;

export const AppWrapNoLogin = styled.main`
    display: flex;
    height: 100vh;
    flex-wrap: nowrap;
    flex-direction: column;
    background-image: url(${(BG)});
    justify-content: ${(props) => (props.authed ? 'initial' : 'center')};
    overflow: hidden;
`;

export const InnerContent = styled.section`
    width: 100%;
    float: left;
    padding: 2rem;

    ${media.desktop`
        padding: 5rem;
    `}
`;

export const NoResults = styled.span`
    ${LightParagraph}
    line-height: 4rem;
    text-align: ${(props) => (props.alignLeft ? 'left' : 'center')};
    width: calc(100% - 3rem);
    margin: 0 1.5rem;

    button {
        ${ParagraphBaseStyle}
        background: none;
        border: none;
        color: ${(props) => props.theme.primary};

        &:hover {
            text-decoration: underline;
        }
    }
`;
