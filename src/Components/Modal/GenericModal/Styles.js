import { rgba } from 'polished';
import styled from 'styled-components';
import ButtonBase from 'Styles/Button';

export const Message = styled.div`
    display: block;
    margin-bottom: 2rem !important;

    p {
        font-size: ${(props) => props.theme.typography.base} !important;
        color: ${(props) => rgba(props.theme.white, 0.5)} !important;
        line-height: 1.2;

        &:not(:last-of-type) {
            margin-bottom: 1.5rem;
        }
    }
`;