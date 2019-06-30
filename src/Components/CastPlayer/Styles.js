import styled from 'styled-components';

export const CastPlayerWrap = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    background: ${(props) => props.theme.dark};
    border-top: 1px solid ${(props) => props.theme.sidebar};
    width: 100%;
    z-index: 999;
    height: ${(props) => props.theme.layout.player};
    padding: 1rem 2rem 1rem 14rem;
    display: flex;
`;

export const CastingInfo = styled.div`
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;

    img {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        width: 12rem;
        padding: 1rem;
        background: ${(props) => props.theme.dark};
        border: 1px solid ${(props) => props.theme.sidebar};
    }

    h4,
    h5 {
        color: #fff;
        font-family: ${(props) => props.theme.fonts.opensans};
        margin-left: 0.5rem;
        font-size: 1.4rem;
    }

    h5 {
        opacity: 0.5;
        font-weight: 500;
    }

    h4 {
        font-weight: 600;
        margin: 0 0 0.5rem 0.5rem;
    }
`;

export const CastingControls = styled.div`
    margin: 0 auto;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

export const CastingVolumne = styled.div`
    margin-left: auto;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
