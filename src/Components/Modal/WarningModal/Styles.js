import styled from 'styled-components';

export const Message = styled.p`
    display: block;
    margin-bottom: 2rem;
    color: white;
    font-weight: 500;
`;

export const Button = styled.button`
    height: 5rem;
    border: none;
    padding: 0 1.5rem;
    background: ${({ theme, confirm }) => (confirm ? theme.alerts.error : '#0c0d16')};
    color: #fff;
    border-radius: 0.3rem;
    transition: 0.2s background;

    :hover {
        background: ${({ theme, confirm }) => (confirm ? theme.alerts.darken.error : '#0f1019')};
        transition: 0.2s background;
    }

    :disabled {
        opacity: 0.8;
        color: rgba(255, 255, 255, 0.2);

        :hover {
            background: #191a2a;
        }
    }

    + button {
        margin-left: 1rem;
    }
`;
