import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { media } from 'Styles/Utils';
import { rgba } from 'polished';
import { HeadingFourStyle, ParagraphBaseStyle } from 'Styles/Base';
import FlexCenter from 'Styles/Helpers';

const fadeInZoom = keyframes`
  from {
    opacity:0;
    transform: scale(.9);
  }
  to {
    opacity:1;
    transform: scale(1);
   }
`;

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: ${(props) => rgba(props.theme.black, 0.67)};
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

export const ModalWrap = styled.div`
    opacity: 0;
    max-width: ${(props) => props.wide ? '75rem' : '50rem'};
    width: 100%;
    box-shadow: 0 0 25px ${(props) => rgba(props.theme.black, 0.4)};
    animation: 0.3s ${fadeInZoom} forwards;
    border-radius: ${(props) => props.theme.button.borderRadius};
    background: ${({ theme }) => theme.background};

    ${media.tablet`
        min-width: 50rem;
    `};
`;

export const ModalCloseWrap = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    ${FlexCenter}
    height: 6rem;
    width: 6rem;
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    cursor: pointer;
    z-index: 11;

    &:hover {
        background: ${(props) => rgba(props.theme.black, 0.1)};
    }
`;

export const ModalCloseButton = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.white};
`;

export const ModalHeader = styled.header`
    float: left;
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    background: ${(props) => rgba(props.theme.black, 0.1)};

    p {
        font-size: ${(props) => props.theme.typography.small};
        font-weight: 600;
        font-family: ${({ theme }) => theme.fonts.body};
        color: #fffc;
        line-height: 1.8;
        margin-top: 0.5rem;
        opacity: 0.6;

        span {
            color: ${(props) => props.theme.white};
            font-weight: bold;
        }
    }
`;

export const ModalHeading = styled.h3`
    ${HeadingFourStyle}
    color: ${(props) => props.theme.white};
    text-transform: capitalize;
    font-weight: 600;

    svg {
      margin-right: 1rem;
    }
`;

export const ModalBody = styled.div`
    float: left;
    width: 100%;
    padding: 2rem;
    max-height: 60vh;
    overflow: ${(props) => props.overflow ? "initial" : "scroll"};    

    position: relative;

    h2 {
      ${ParagraphBaseStyle}
      color: ${(props) => props.theme.white};
      margin-bottom: 1.5rem;
    }

    p {
      color: ${(props) => props.theme.white};
      margin-bottom: 0.6rem;
      font-size: ${(props) => props.theme.typography.small};

      strong {
        font-weight: 700;
      }

      span {
        text-transform: capitalize;
        display: inline-block;
        margin-right: 0.5rem;
        color: ${(props) => rgba(props.theme.white, 0.5)};

        &:not(:first-of-type){
          margin-left: 1rem;
        }
      }
    }
`;

export const PathWrap = styled.div`
    padding: 1rem;
    font-size: ${(props) => props.theme.typography.small};
    color: ${(props) => rgba(props.theme.white, 0.5)};
    margin-bottom: 2rem;
    border-radius: ${(props) => props.theme.button.borderRadius};
    line-height: 1.2;
    background-color: ${(props) => rgba(props.theme.white, 0.1)};
`;

export const InfoTitle = styled.div`
    font-size: ${(props) => props.theme.typography.base};
    margin-bottom: 1rem;
    color: ${(props) => props.theme.white};
    font-weight: 700;
`;

export const FileWrap = styled.div`
    margin-bottom: 2rem;

    &:last-of-type {
      margin-bottom: 0;
    }
`;

export const SectionWrap = styled.div`
    margin-bottom: ${(props) => props.noMargin ? null : "2rem"};
`;

export const InfoWrap = styled.div`
    display: flex;
    flex-wrap: wrap;

    > p {
      margin-right: 0.5rem;
    }

    div {
      margin-right: 3rem;
      width: calc(55% - 3rem);

      p {
        display: flex;
        justify-content: space-between;
        margin-right: 0.5rem;
        margin-bottom: 0.8rem;
        font-size: ${props => props.theme.typography.base};
      }

    }
`;

export const FileLocationList = styled.div`
  max-height: ${(props) => props.tall ? '18rem' : '8.5rem'};
  padding: 1rem;
  width: 100%;
  margin-top: 1rem;
  overflow: scroll;
  background-color: ${(props) => rgba(props.theme.black, 0.2)};

  p {
    margin-top: 0;
  }
`