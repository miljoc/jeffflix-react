import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { rgba } from 'polished';
import ButtonBase from 'Styles/Button';

export const SubmitLibrary = styled.button`
    ${ButtonBase}
    padding: 0 1.8rem;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.disabled ? props.theme.black : props.theme.alerts.success};
    opacity: ${(props) => (props.disabled ? '.2' : 1)};
    transition: ${(props) => props.theme.base.transitionSpeed} background;
    float: right;

    &:hover {
        background: ${(props) =>
            props.disabled ? props.theme.black : props.theme.alerts.darken.success};
    }
`;

export const AddLibraryWrap = styled.article`
    float: left;
    width: 100%;
    position: relative;
    border-top: 1px solid ${(props) => rgba(props.theme.black, 0.2)};
    padding-top: 1rem;

    h4 {
        color: ${(props) => props.theme.white};
        margin-top: 1rem;
        margin-bottom: 2rem;
        font-size: ${(props) => props.theme.typography.body};
    }
`;

export const LibraryItemWrap = styled.article`
    float: left;
    width: 100%;
    margin: 0 0 1rem;
    display: flex;
    align-items: center;
    position: relative;
    background: ${(props) => rgba(props.theme.black, 0.2)};
`;

export const LibraryUnhealthy = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.alerts.error};
    font-size: ${(props) => props.theme.typography.small};
    height: 4.5rem;
    float: left;
    margin-right: 1.5rem;
    min-width: 2.5rem;
    cursor: pointer;
    padding: 1.6rem 0;
    margin: 0 0 0 -1rem;
`;

export const LibraryItemFilePath = styled.span`
    line-height: 1.8;
    border-radius: 0.2rem;
    color: #737382;
    display: block;
    float: left;
    font-size: ${(props) => props.theme.typography.small};
    font-weight: 600;
    flex: 1;
    max-width: calc(100% - 5rem);
    line-height: 5rem;
    padding: 0 1.5rem;

    p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    span {
        float: left;
        padding: 0 1.5rem;
        transform: translateX(-1.5rem);
        color: ${(props) => rgba(props.theme.white, 0.5)};
        background: ${(props) => rgba(props.theme.black, 0.1)};
        border-radius: 0.2rem 0 0.2rem 0;
        border-right: 1px solid ${(props) => rgba(props.theme.black, 0.3)};
        text-transform: capitalize;
        max-width: 15rem;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
        white-space: nowrap;
        font-size: ${(props) => props.theme.typography.small};
    }
`;

export const LibraryItemDelete = styled(FontAwesomeIcon)`
    position: absolute;
    right: 0;
    color: ${(props) => (props.deleting ? props.theme.white : props.theme.alerts.error)};
    height: 4.5rem;
    width: 4.5rem !important;
    cursor: pointer;
    padding: 1.5rem;
    opacity: ${(props) => (props.deleting ? 1 : 0.5)};
    transition: ${(props) => props.theme.base.transitionSpeed} opacity;

    &:hover {
        opacity: 1;
    }
`;

export const LibraryItemRescan = styled(LibraryItemDelete)`
    right: 4.5rem;
    color: ${(props) => props.theme.white} !important;
`;