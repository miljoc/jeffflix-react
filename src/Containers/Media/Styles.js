import styled, { css } from 'styled-components';
import { media } from 'Styles/Utils';

export const LibraryListWrap = styled.section`
    display: flex;
    flex-flow: row wrap;
    /* align-items: center; */
    justify-content: flex-start;
    width: 100%;
    padding: 2rem 1rem 0rem;
    height: calc(100vh - 9rem);
    margin-top: 9rem;

    ${media.desktop`
        padding: 4rem 3rem 0;
    `}

    ${media.large`
        padding:5rem 3.5rem 2rem;
    `}
`;

export const RenderListWrap = styled.div`
    width: 100%;
    height: calc(100% - 11rem);
    padding-top: 2rem;

    ${media.desktop`
        height: calc(100% - 5rem);
    `}
`;

export const LibraryListItem = styled.div`
    ${(props) => props.hasWidth && css`
        flex: 1 0 auto;
        width:calc(50% - 2rem);
        max-width:calc(50% - 2rem);
        margin: 0 1rem 2rem;

        ${media.mobile`
            width:calc(33.3333% - 3rem);
            max-width:calc(33.3333% - 3rem);
            margin: ${(props) => props.theme.card.margin};
        `}

        ${media.tablet`
            width:calc(25% - 3rem);
            max-width:calc(25% - 3rem);
            margin: ${(props) => props.theme.card.margin};
        `}

        ${media.desktop`
            width:calc(25% - 3rem);
            max-width:calc(25% - 3rem);
            ${media.large`
                width: ${(props) => props.theme.card.maxWidth};
                max-width: ${(props) => props.theme.card.maxWidth};
            `}
        `}
    `}

    width: calc(100% - 2rem);
    margin: 0 auto;

`;

export const LibraryListItemWide = styled.div`
    flex: 1 0 auto;
    width:calc(100% - 2rem);
    max-width:calc(100% - 2rem);
    margin: 0 1rem 2rem;

    ${media.mobile`
        width: ${(props) => props.theme.wideCard.width};
        max-width: ${(props) => props.theme.wideCard.maxWidth};
        margin: ${(props) => props.theme.wideCard.margin};
    `}

    ${media.tablet`
        width:calc(50% - 3rem);
        max-width:calc(50% - 3rem);
        margin: ${(props) => props.theme.card.margin};
    `}

    ${media.large`
        width: ${(props) => props.theme.wideCard.width};
        max-width: ${(props) => props.theme.wideCard.maxWidth};
        margin: ${(props) => props.theme.wideCard.margin};
    `}
`;

export const SortRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-basis: 100%;
    height: 5rem;
    justify-content: space-between;
    margin: 0 1rem 2rem;
`;