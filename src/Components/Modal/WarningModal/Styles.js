import { rgba } from 'polished';
import styled from 'styled-components';
import ButtonBase from 'Styles/Button';

export const Message = styled.p`
    display: block;
    margin-bottom: 2rem !important;
    font-size: ${(props) => props.theme.typography.base} !important;
    color: ${(props) => rgba(props.theme.white, 0.5)} !important;
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: ${(props) => props.align === 'right' ? 'flex-end' : 'flex-start'};
`;

export const ModalButton = styled.button`
    ${ButtonBase}
    background: ${({ theme, confirm }) => (confirm ? theme.alerts.error : rgba(theme.black, 0.3))};
    color: ${(props) => props.theme.white};
    padding: 0 2.5rem;

    &:hover {
        background: ${({ theme, confirm }) => (confirm ? theme.alerts.darken.error : theme.darken.background)};
    }

    &:disabled {
        opacity: 0.8;
        color: ${(props) => rgba(props.theme.white, 0.2)};
    }

    + button {
        margin-left: 1rem;
    }
`;
