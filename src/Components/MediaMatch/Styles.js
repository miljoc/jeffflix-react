import { rgba } from 'polished';
import styled from 'styled-components';
import { media } from 'Styles/Utils';

export const Match = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    text-align: left;
    width: 100%;
    height: 100%;
    padding: 0;

    ${media.tablet`
        padding: 0 1rem;
    `}
    
    small, label {
        display: flex;
        height: 100%;
        width: 100%;
        font-size: ${(props) => props.theme.typography.root};
        align-items: center;
        cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
        user-select: none;
        color: ${(props) => rgba(props.theme.white, 0.7)};

        &:hover {
            color: ${(props) => (props.theme.primary)};
        }

        ${media.mobile`
            font-size: ${(props) => props.theme.typography.small};
        `}
    }

`;

export const MovieMatch = styled(Match)`
    text-align: left;
`;

export const EpisodeMatch = styled(Match)``