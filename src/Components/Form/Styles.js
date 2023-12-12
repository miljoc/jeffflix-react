import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { aFadeIn } from 'Styles/Animations';
import { rgba } from 'polished';

const animation = (props) =>
    css`
        ${aFadeIn} 0.2 infinite alternate;
    `;

export const Input = styled.input`
    padding: 0 8rem 0 1.5rem;
    line-height: 4rem;
    border-radius: ${(props) => props.theme.button.borderRadius};
    color: ${(props) => props.theme.white};
    display: block;
    float: left;
    width: 100%;
    border: 0;
    transition: ${(props) => props.theme.base.transitionSpeed} all;
    font-weight: 600;
    font-size: ${(props) => props.theme.typography.base};
    background: ${(props) => rgba(props.theme.black, 0.2)};
    margin: 0 0 1rem;

    &:focus {
        outline: none;
        color: ${(props) => props.theme.white};
        background: #0e0f18;
    }
`;

export const DropdownIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.white};
    font-size: ${(props) => props.theme.typography.base};
`;

export const SelectStyle = {
    container: (base) => ({
        ...base,
        flex: 1,
        width: '100%',
        float: 'left',
    }),
    option: (base, { isDisabled }) => ({
        ...base,
        cursor: 'pointer',
        backgroundColor: '#0e0f18 !important',
        transition: '0.2s all',
        color: 'var(--jeffflix-white)',
        opacity: isDisabled ? 0.2 : 1,

        '&:hover': {
            color: 'var(--jeffflix--primary)',
        },
    }),
    control: (base, { menuIsOpen }) => ({
        width: '100%',
        background: menuIsOpen ? '#0e0f18' : 'rgba(0,0,0,0.2)',
        cursor: 'pointer',
        color: 'var(--jeffflix--primary)',
        position: 'relative',
        float: 'left',
        padding: '0 1.5rem',
        height: '5rem',
        margin: '0 0 1rem',
        borderRadius: '0.2rem',
    }),
    placeholder: (base) => ({
        ...base,
        color: 'rgba(255,255,255,.1)',
    }),
    menu: (base) => ({
        ...base,
        width: 'auto',
        overflow: 'hidden',
        cursor: 'pointer',
        animation: animation,
        margin: '0',
        width: '100%',
        boxShadow: 'none',
        borderRadius: '0.2rem',
    }),
    menuList: (base) => ({
        ...base,
        padding: '1rem',
        backgroundColor: '#0e0f18 !important',
        margin: '0',
        fontSize: '1.4rem',
        fontWeight: '600',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        lineHeight: '2rem',
        border: 'none',
        textTransform: 'capitalize',
    }),
    valueContainer: (base) => ({
        ...base,
        fontWeight: 600,
        fontSize: '1.4rem',
        lineHeight: '5rem',
        height: '5rem',
        float: 'left',
        width: '100%',
        display: 'inline-block',
        padding: '0',
    }),
    dropdownIndicator: (base) => ({
        ...base,
        padding: 0,
        marginLeft: '1rem',
        color: 'var(--jeffflix--primary)',
        height: '5rem',
        position: 'absolute',
        top: '0',
        right: '0',
        width: '4.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '0.2s all',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    singleValue: (base) => ({
        ...base,
        color: 'var(--jeffflix-white)',
        margin: 0,
        overflow: 'hidden',
        height: '5rem',
        width: '100%',
    }),
};
