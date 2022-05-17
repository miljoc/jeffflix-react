import { rgba } from 'polished';
import styled from 'styled-components';
import { ParagraphBaseStyle } from 'Styles/Base';

const getColor = (props) => {
    switch (props.type) {
        case 'error':
            return props.theme.alerts.error;
        case 'info':
            return props.theme.white;
        case 'success':
            return props.theme.alerts.success;
        default:
            return props.theme.black;
    }
};

export const AlertInlineBase = styled.span`
    float: left;
    width: 100%;
    color: ${(props) => getColor(props)};
    border: ${(props) => (props.type === 'info' ? 'none' : `1px solid ${getColor(props)}`)};
    background: ${(props) => (props.type === 'info' ? 'rgb(21, 22, 35)' : 'rgb(22, 22, 34)')};
    font-size: ${(props) => props.theme.typography.base};
    font-weight: 400;
    margin: 0 0 1rem;
    text-align: center;
    border-radius: ${(props) => props.theme.button.borderRadius};
`;

export const AlertInlineWrap = styled(AlertInlineBase)`
    padding: 0 1.5rem;
    line-height: 4rem;
    height: 4rem;
`;

export const AlertConfirmWrap = styled(AlertInlineBase)`
    line-height: 2.4rem;
    display: flex;
    justify-content: space-between;

    p {
        padding: 1rem 1.5rem;
        display: inline-block;
        font-size: ${(props) => props.theme.typography.base} !important;
    }

    button {
        float: left;
        border-radius: 0 ${(props) => props.theme.button.borderRadius} ${(props) => props.theme.button.borderRadius} 0;
        border: 0;
        padding: 0 2rem;
        color: ${(props) => props.theme.white};
        background: ${(props) => getColor(props)};
    }
`;

export const AlertWrap = styled.div`
    background: ${(props) => props.theme.white};
    margin: 0 3rem 3rem;
    padding: 3rem;
    box-shadow: 0 10px 30px ${(props) => rgba(props.theme.black, 0.05)};
    position: relative;
    max-width: 40rem;
`;

export const AlertType = styled.strong`
    ${ParagraphBaseStyle}
    color: ${(props) => getColor(props)};
    margin-right: 0.5rem;
    &:after {
        content: ':';
    }
`;

export const AlertMessage = styled.p`
    ${ParagraphBaseStyle}
    color: ${({ theme }) => theme.text};
    line-height: 1.75;
    display: inline-block;
    padding-left: 5rem;
    letter-spacing: 0.05rem;
`;

export const IconWrap = styled.span`
    position: absolute;
    top: 50%;
    left: 3rem;
    margin-top: -1.6rem;
`;

export const Close = styled.span`
    position: absolute;
    top: 1.3rem;
    right: 1.5rem;
    font-size: ${(props) => props.theme.typography.base};
    cursor: pointer;
    color: ${({ theme }) => theme.secondary};
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    opacity: 0.5;

    &:hover {
        opacity: 1;
        color: ${(props) => rgba(props.theme.black, 1)}
    }
`;
