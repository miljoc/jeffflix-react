import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Arrow = styled(FontAwesomeIcon)`
    font-size: ${(props) => props.theme.typography.headingThree};
    color: ${(props) => props.theme.white};
    cursor: pointer;
    position: absolute;
    top: -4rem;
    transition: ${(props) => props.theme.base.transitionSpeed} all;

    &.slick-disabled {
        opacity: 0.2;
        cursor: initial;
    }
`;

export const NextArrow = styled(Arrow)`
    right: 1.5rem;
`;

export const PrevArrow = styled(Arrow)`
    right: 5rem;
`;
