import styled from 'styled-components';

export const ErrorWrap = styled.p`
    margin-left: ${(props) => (props.marginLeft ? '1.5rem' : '0')};
    color: ${(props) => props.theme.white};
    line-height: 1;
    font-size: ${(props) => props.theme.typography.base};
    text-align: left;
    color: ${(props) => props.theme.alerts.error};
    opacity: 0.8;
`;