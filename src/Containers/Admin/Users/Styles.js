import styled from 'styled-components';
import { media } from 'Styles/Utils';

export const List = styled.ul`
    width: 100%;
    background: #222332;
    margin: 0 0 2rem;
    overflow: hidden;
    position: relative;
    border-radius: ${(props) => props.theme.button.borderRadius};

    ${media.desktop`
        width:55%;
        margin:0 0 3rem;
    `}

    &:last-child {
        margin: 0;
    }
`;

export const ListHeading = styled.li`
    width: 100%;
    padding: 0 2rem;
    line-height: 5rem;
    text-transform: capitalize;
    font-weight: 600;
    color: ${(props) => props.theme.white};
    font-size: ${(props) => props.theme.typography.body};
    background: #1e1f2d;
`;
