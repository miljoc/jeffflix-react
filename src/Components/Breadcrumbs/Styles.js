import { rgba } from 'polished';
import styled from 'styled-components';
import { media } from 'Styles/Utils';

export const ListWrap = styled.ul`
    min-width: calc(100% - 7.5rem);
    margin: 0 0 2rem;
`;

export const ListItem = styled.li`
    display: none;
    color: ${(props) => props.theme.white};
    font-size: ${(props) => props.theme.typography.base};
    font-weight: 400;
    line-height: 1.5;
    margin: 0 1rem 1rem 0;
    max-width: 30rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:after {
        content: '-';
        color: ${(props) => rgba(props.theme.white, 0.25)};
        padding-left: 1rem;
    }

    &:last-child {
        font-weight: 600;

        &:after {
            display: none;
        }
    }

    &:nth-last-child(-n + 2) {
        display: inline-block;
    }

    a {
        color: ${(props) => rgba(props.theme.white, 0.25)};
        transition: ${(props) => props.theme.base.transitionSpeed} all;

        &:hover {
            color: ${(props) => props.theme.white};
        }
    }

    ${media.tablet`
    display: inline-block;

    &:nth-last-child(-n+2) {
      display: inline-block;
    }
  `}
`;
