import styled from 'styled-components';
import { media } from 'Styles/Utils';
import { ParagraphBaseStyle } from 'Styles/Base';

export const AppWrap = styled.main`
    display: flex;
    height: 100vh;
    flex-wrap: nowrap;
    flex-direction: column;
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
    ${ParagraphBaseStyle}
    float: left;
    width: 100%;
    line-height: 4rem;
    text-align: ${(props) => (props.alignLeft ? 'left' : 'center')};
    color: ${(props) => props.theme.white};
    width: calc(100% - 3rem);
    margin: 0 1.5rem;
    opacity: 0.8;

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
