import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonBase from 'Styles/Button';
import { ParagraphBaseStyle } from 'Styles/Base';

export const UserListItem = styled.li`
    ${ParagraphBaseStyle}
    width: 100%;
    padding: 0 0 0 2rem;
    line-height: 4rem;
    color: ${(props) => props.theme.white};
    background: ${(props) => (props.success ? props.theme.alerts.success : '#222332')};
    text-align: ${(props) => (props.success ? 'center' : 'left')};

    &:last-child {
        border: 0;
    }
`;

export const AdminUser = styled(FontAwesomeIcon)`
    font-size: ${(props) => props.theme.typography.root};
    color: ${(props) => props.theme.primary};
    margin-left: 0.5rem;
    transform: translateY(-0.2rem);
`;

export const DeleteUser = styled(FontAwesomeIcon)`
    font-size: ${(props) => props.theme.typography.base};
    color: ${(props) => props.theme.alerts.error};
    cursor: pointer;
    float: right;
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    height: 4rem;
    opacity: 0.6;
    padding: 1.4rem;
    width: 4rem !important;

    &:hover {
        opacity: 1;
    }
`;

export const CopyInvite = styled(FontAwesomeIcon)`
    font-size: ${(props) => props.theme.typography.base};
    color: #666;
    cursor: pointer;
    float: right;
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    height: 4rem;
    opacity: 0.5;
    padding: 1.4rem;
    width: 4rem !important;

    &:hover {
        opacity: 1;
    }
`;

export const GenerateInvite = styled.button`
    ${ButtonBase}
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.background};
    line-height: 4rem;
    padding: 0 2.5rem;
    float: left;

    &:disabled {
        opacity: 0.2;
    }

    &:hover {
        background: ${(props) => props.theme.darken.background};
    }
`;