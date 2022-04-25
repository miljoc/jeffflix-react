import styled from 'styled-components';
import { media } from 'Styles/Utils';
import { HeaderIcon, HeaderIconWrap } from 'Components/Media/MediaHeader/Styles';

export const InnerParagraph = styled.p`
    color: #FFF;
    padding-bottom: 2rem;
`;

export const MatchLine = styled.div`
    color: #fff;
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    
    > div {
        float: none;
    }

    &:nth-of-type(odd) {
        background-color: rgba(0,0,0,0.2);
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

export const Button = styled.button`
    font-size: 1.4rem;
    height: 4rem;
    cursor: pointer;
    border: 0;
    background: 0;
    border-radius: 0.2rem;
    padding: 0 1.8rem;
    color: ${(props) => props.disabled ? '#aeaeae' : '#FFF'};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'initial')};
    background: ${(props) => props.disabled ? '#000' : props.theme.alerts.success};
    opacity: ${(props) => props.disabled ? '0.3' : '1'};
    transition: all 0.2s;
    font-weight: 600;

    &:hover {
        background: ${(props) =>
            props.disabled ? '#ccc' : props.theme.alerts.darken.success};
    }
`;

export const UncheckButton = styled(Button)`
    background: ${(props) => props.disabled ? '#000' : props.theme.alerts.error};
    margin-right: 1rem;
`;