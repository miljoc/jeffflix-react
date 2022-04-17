import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HeaderIcon, HeaderIconWrap } from 'Components/Media/MediaHeader/Styles';

export const InnerParagraph = styled.p`
    color: #FFF;
    padding-bottom: 2rem;
`;

export const MovieLine = styled.div`
    color: #fff;
    display: flex;
    align-items: center;

    small {
        opacity: 0.7;
        font-size: 80%;
    }

    > div {
        float: none;
    }

    ${HeaderIcon}, ${HeaderIconWrap} {
        height: auto;
        width: 2rem;
    }

    ${HeaderIconWrap} {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 1.2rem 1rem;
        
        &:hover {
            color: #FF9B3D;
        }
    }

    &:nth-of-type(odd) {
        background-color: rgba(0,0,0,0.2);
    }
`;

export const MoviesWrap = styled.div``;