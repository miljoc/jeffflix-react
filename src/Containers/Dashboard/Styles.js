import styled from 'styled-components';
import { media } from 'Styles/Utils';
import { HeadingFour } from 'Styles/Base';

export const DashboardWrap = styled.section`
    width: 100%;
    float: left;
    padding: 3rem 1rem;

    section:last-child {
        margin: 0;
    }

    ${media.tablet`
    padding:4rem 1rem;
  `}

    ${media.desktop`
    padding:5rem 3.5rem;
  `}
`;

export const MediaCardWrap = styled.div`
    padding: 0 1.5rem;

    &:focus {
        outline: none;
        border: none;
    }
`;

export const CarouselWrap = styled.section`
    float: left;
    width: 100%;
    margin: 0 0 5rem;
    position: relative;

    ${HeadingFour} {
        color: ${(props) => props.theme.white};
        margin: 0 0 2rem 1.5rem;
    }

    .slick-slide {
        transition: ${(props) => props.theme.base.transitionSpeed} all;
    }

    .slick-active {
        opacity: 1;
    }
`;
