import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { media } from 'Styles/Utils';

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
    background: #000000ab;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

export const ModalWrap = styled.div`
    opacity: 0;
    max-width: 50rem;
    width: 100%;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
    animation: 0.3s ${fadeInZoom} forwards;
    border-radius: 0.3rem;
    background: ${({ theme }) => theme.background};

    ${media.tablet`
        min-width: 50rem;
    `};
`;

export const ModalCloseButton = styled(FontAwesomeIcon)`
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    z-index: 11;
    transition: 0.2s all;
    width: 5.8rem !important;
    height: 5.8rem;
    padding: 2rem;
    transition: 0.2s all;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;

export const ModalHeader = styled.header`
    float: left;
    width: 100%;
    max-width: 60rem;
    width: 100%;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.1);

    p {
        font-size: 1.2rem;
        font-weight: 600;
        font-family: ${({ theme }) => theme.fonts.opensans};
        color: #fffc;
        line-height: 1.8;
        margin-top: 0.5rem;
        opacity: 0.6;

        span {
            color: #fff;
            font-weight: bold;
        }
    }
`;

export const ModalHeading = styled.h3`
    font-size: 1.8rem;
    color: #fff;
    text-transform: capitalize;
    font-weight: 600;
`;

export const ModalBody = styled.div`
    float: left;
    width: 100%;
    padding: 2rem;
    max-height: 60vh;
    overflow: ${(props) => props.overflow ? "initial" : "scroll"};    

    position: relative;

    h2 {
      color: white;
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    p {
      color: white;
      margin-bottom: 0.6rem;
      font-size: 1.2rem;

      strong {
        font-weight: 700;
        margin-right: 0.5rem;
      }

      span {
        text-transform: capitalize;
        font-weight: 700;
        display: inline-block;
        margin-right: 0.5rem;
        color: #656565;

        &:not(:first-of-type){
          margin-left: 1rem;
        }
      }
    }
`;

export const PathWrap = styled.div`
    padding: 1rem;
    font-size: 1.2rem;
    color: white;
    margin-bottom: 2rem;
    border-radius: 0.3rem;
    background-color: rgba(255,255,255,0.1);
`;

export const InfoTitle = styled.div`
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: white;
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
      width: calc(45% - 3rem);

      p {
        display: flex;
        justify-content: space-between;
        margin-right: 0.5rem;
      }

    }
`;
