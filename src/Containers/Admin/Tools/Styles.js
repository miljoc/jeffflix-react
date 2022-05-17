import styled from 'styled-components';
import { media } from 'Styles/Utils';
import { HeaderIcon, HeaderIconWrap } from 'Components/Media/MediaHeader/Styles';
import { rgba } from 'polished';
import ButtonBase from 'Styles/Button';

export const InnerParagraph = styled.p`
    color: ${(props) => props.theme.white};
    padding-bottom: 2rem;
`;

export const MatchLine = styled.div`
    color: ${(props) => props.theme.white};
    display: flex;
    align-items: center;
    width: 100%;
    height: 4.5rem;
    
    > div {
        float: none;
    }

    &:nth-of-type(odd) {
        background-color: ${(props) => rgba(props.theme.black, 0.2)};
    }
`;

export const MatchContainer = styled.div``;

export const StickyButton = styled.div`
    position: fixed;
    padding: 1.4rem;
    z-index: 11;
    bottom: 0;
    right: 0;
`;

export const MatchButton = styled.button`
    ${ButtonBase}
    height: 4rem;
    padding: 0 1.8rem;
    color: ${(props) => props.disabled ? '#aeaeae' : props.theme.white};
    background: ${(props) => props.disabled ? props.theme.black : props.theme.alerts.success};
    opacity: ${(props) => props.disabled ? '0.3' : '1'};

    &:hover {
        background: ${(props) =>
            props.disabled ? '#ccc' : props.theme.alerts.darken.success};
    }
`;

export const UncheckButton = styled(MatchButton)`
    background: ${(props) => props.disabled ? props.theme.black : props.theme.alerts.error};
    margin-right: 1rem;
`;