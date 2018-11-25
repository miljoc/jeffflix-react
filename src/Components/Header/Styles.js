import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { media } from 'Styles/Utils';
import { aFadeIn } from 'Styles/Animations';

export const HeaderWrap = styled.header`
    height: auto;
    float:left;
    width: 100%;
    z-index:5;
    padding:3rem .5rem 0;
    display:flex;

    button:last-child {
      margin-left: auto;
    }

    ${media.desktop`
      padding:4rem 2rem 0;
    `}

    ${media.large`
      padding:4rem 3rem 0;
    `}
`;

export const NavIcon = styled(FontAwesomeIcon)`
    color: rgba(255,255,255, .5);
    font-size:1.6rem;
    transition:.2s all;
`;

export const HideNavIcon = styled(FontAwesomeIcon)`
    color: #FFF;
    font-size:1.6rem;
    transition:.2s all;
    width: 5rem !Important;
    height: 5rem;
    margin:3rem .5rem;
    padding:1.75rem;
    cursor:pointer;
`;

export const NavButton = styled.button`
    float:${props => (props.alignLeft ? 'left' : 'right')};
    background:none;
    border:none;
    transition:.2s background;
    width:${props => props.theme.layout.header};
    height:${props => props.theme.layout.header};
    
    &:hover {
      ${NavIcon}{
        color: #FFF;
      }
    }
`;

export const ContentOverlay = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(13, 14, 26, 0.8);
    z-index:6;
    animation: ${`.2s ${aFadeIn} alternate`};
`;
