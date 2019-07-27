import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Slider } from 'react-player-controls';
import { aFadeIn } from 'Styles/Animations';

export const PlayerButton = styled.button`
    background: none;
    border: none;
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: 0.2s all;

    &:hover {
        opacity: 1;
        transform: scale(1.1);
    }
`;

export const PlayerIcon = styled(FontAwesomeIcon)`
    color: #fff;
    font-size: 1.4rem;
    opacity: 0.8;
`;

export const PlayerButtonSmall = styled.button`
    background: none;
    border: none;
    width: rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: 0.2s all;

    &:hover {
        opacity: 1;
        transform: scale(1.05);
    }
`;

export const PlayerIconSmall = styled(FontAwesomeIcon)`
    color: #fff;
    font-size: 1.4rem;
`;

export const SeekBarWrap = styled.div`
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: ${(props) => (props.maxWidth ? `${props.maxWidth}rem` : '100%')};
    margin-left: ${(props) => (props.marginLeft ? `${props.marginLeft}rem` : 0)};
    max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}rem` : '100%')};

    span {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 600;
        line-height: 2rem;
        margin: 0 1rem;
        opacity: 0.5;
    }
`;

export const SliderHandle = styled.div`
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    left: ${(props) => props.value * 100}%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 50%;
    opacity: 0;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);

    ${SeekBarWrap}:hover & {
        opacity: 1;
    }
`;

export const SeekBarSlider = styled(Slider)`
    width: 100%;
    float: left;
    height: 1.2rem;
    cursor: pointer;
    position: relative;

    &:before {
        content: '';
        height: 0.2rem;
        border-radius: 0.3rem;
        background: #000;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translatey(-50%);
    }
`;

export const SliderBar = styled.div`
    position: absolute;
    border-radius: 0.3rem;
    height: 0.2rem;
    background: ${(props) => (props.isMuted ? props.theme.sidebar : props.theme.primary)};
    top: 50%;
    transform: translatey(-50%);
    bottom: 0;
    left: 0;
    width: ${(props) => props.value * 100}%;
    cursor: pointer;
`;

export const SelectStyle = {
    container: (base) => ({
        ...base,
        flex: 1,
        width: '100%',
        float: 'left',
    }),
    option: (base, { isDisabled, isSelected }) => ({
        ...base,
        cursor: 'pointer',
        backgroundColor: '#212231 !important',
        transition: '.2s all',
        color: isSelected ? '#FF9B3D' : '#FFF',
        opacity: isDisabled ? 0.2 : 1,

        '&:hover': {
            color: '#FF9B3D',
        },
    }),
    control: () => ({
        display: 'none',
    }),
    placeholder: (base) => ({
        ...base,
        color: 'rgba(255,255,255,.1)',
    }),
    menu: (base) => ({
        ...base,
        width: 'auto',
        borderRadius: '0',
        overflow: 'hidden',
        cursor: 'pointer',
        animation: `${`.4s ${aFadeIn} alternate`}`,
        margin: '0',
        width: '100%',
        boxShadow: 'none',
        borderRadius: '0.2rem',
    }),
    menuList: (base) => ({
        ...base,
        padding: '1rem',
        backgroundColor: '#212231 !important',
        margin: '0',
        fontSize: '1.4rem',
        fontWeight: '600',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        overflowX: 'hidden',
        overflowY: 'auto',
        lineHeight: '2rem',
        border: 'none',
        textTransform: 'capitalize',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',

        '&::-webkit-scrollbar': {
            display: 'none',
        },
    }),
    valueContainer: () => ({
        display: 'none',
    }),
    dropdownIndicator: () => ({
        display: 'none',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    singleValue: () => ({
        display: 'none',
    }),
};
