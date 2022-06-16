import styled from 'styled-components';

export const ErrorWrap = styled.p`
    margin-left: ${(props) => (props.marginLeft ? '1.5rem' : '0')};
    line-height: 1;
    font-size: ${(props) => props.theme.typography.base};
    text-align: left;
    color: ${(props) => props.theme.alerts.error} !important;
    opacity: 0.8;
`;