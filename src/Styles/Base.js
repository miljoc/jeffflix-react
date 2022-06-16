import { rgba } from 'polished';
import styled, { css } from 'styled-components';
import FlexCenter from 'Styles/Helpers';

export const ParagraphBaseStyle = css`
    font-size: ${(props) => props.theme.typography.base};
    font-weight: 600;
`;

export const HeadingBaseStyle = css`
    font-family: ${(props) => props.theme.fonts.heading};
    font-weight: 800;
`;

export const HeadingOneStyle = css`
    font-size: ${(props) => props.theme.typography.headingOne};
`;

export const HeadingTwoStyle = css`
    font-size: ${(props) => props.theme.typography.headingTwo};
`;

export const HeadingThreeStyle = css`
    font-size: ${(props) => props.theme.typography.headingThree};
`;

export const HeadingFourStyle = css`
    font-size: ${(props) => props.theme.typography.headingFour};
`;

export const HeadingFiveStyle = css`
    text-transform: uppercase;
    font-size: ${(props) => props.theme.typography.root};
`

export const PageHeading = styled.h1`
    ${HeadingTwoStyle}
    color: ${(props) => props.theme.white};
    margin: 0 0 3rem;
`;

export const HeadingOne = styled.h1`
    ${HeadingOneStyle}
`;

export const HeadingTwo = styled.h2`
    ${HeadingTwoStyle}
`;

export const HeadingThree = styled.h3`
    ${HeadingThreeStyle}
`;

export const HeadingFour = styled.h4`
    ${HeadingFourStyle}
`;

export const LightParagraph = css`
    font-size: ${(props) => props.theme.typography.base};
    font-weight: 400;
    line-height: 2.6rem;
    color: ${(props) => rgba(props.theme.white, 0.5)};
`;

export const Badge = styled.span`
    display: inline-block;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.primary};
    border-radius: ${(props) => props.theme.button.borderRadius};
    font-family: ${(props) => props.theme.fonts.heading};
    font-size: ${(props) => props.theme.typography.small};
    padding: 0.4rem 0.8rem 0.5rem;
    font-weight: 900;

    ${(props) => props.circle && css`
        border-radius: 50%;
        line-height: 2rem;
        width: 2rem;
        height: 2rem;
        font-size: ${props.theme.typography.root};
        ${FlexCenter}
    `}
`;

export const Checkbox = styled.input`
    &[type="checkbox"] {
        position: absolute; // take it out of document flow
        opacity: 0; // hide it

        & + label {
            position: relative;
            cursor: pointer;

            &:after {
                content: '';
                position: absolute;
                opacity: 0;
                left: 5px;
                top: 50%;
                background: ${(props) => props.theme.white};
                width: 2px;
                height: 2px;
                box-shadow: 
                2px 0 0 ${(props) => props.theme.white},
                4px 0 0 ${(props) => props.theme.white},
                4px -2px 0 ${(props) => props.theme.white},
                4px -4px 0 ${(props) => props.theme.white},
                4px -6px 0 ${(props) => props.theme.white},
                4px -8px 0 ${(props) => props.theme.white};
                transform: translateY(-50%) rotate(45deg);      
                transition: opacity ${(props) => props.theme.base.transitionSpeed} ease-in-out;
            }
        }

        // Box.
        & + label:before {
            content: '';
            margin-right: 10px;
            display: inline-block;
            vertical-align: text-top;
            width: 20px;
            height: 20px;
            background: ${(props) => rgba(props.theme.black, 0.5)};
        }

        // Box hover
        &:hover + label:before {
            background: ${(props) => rgba(props.theme.black, 0.5)};
        }

        &:hover + label:after {
            opacity: 0.5;
        }

        // Box focus
        &:focus + label:before {
            box-shadow: 0 0 0 3px ${(props) => rgba(props.theme.black, 0.12)};
        }

        // Box checked
        &:checked + label:before {
            opacity: 1;
            background: ${(props) => props.theme.primary};
        }        

        // Disabled state label.
        &:disabled + label {
            color: #b8b8b8;
            cursor: auto;
        }

        // Disabled box.
        &:disabled + label:before {
            box-shadow: none;
            background: #ddd;
        }

        // Checkmark. Could be replaced with an image
        &:checked + label:after {
            content: '';
            opacity: 1;
            position: absolute;
            left: 5px;
            top: 50%;
            background: ${(props) => props.theme.white};
            width: 2px;
            height: 2px;
            box-shadow: 
            2px 0 0 ${(props) => props.theme.white},
            4px 0 0 ${(props) => props.theme.white},
            4px -2px 0 ${(props) => props.theme.white},
            4px -4px 0 ${(props) => props.theme.white},
            4px -6px 0 ${(props) => props.theme.white},
            4px -8px 0 ${(props) => props.theme.white};
            transform: translateY(-50%) rotate(45deg);
        }
    }
`;

export const ProgressBar = styled.span.attrs(props => ({
    style: {
        width: `${props.width}%`
    }
}))`
    height: 100%;
    width: 100%;
    display: block;
    transition: width 1s linear;
    background-color: ${(props) => props.theme.primary};

    ${(props) => props.text && css`
        &:after {
            content: '${props.text}';
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            opacity: 0;
            font-size: ${props.theme.typography.root};
            font-weight: 700;
            color: ${props.width > 49 ? props.theme.background : props.theme.white};
            transform: translate(-50%, -50%);
            transition: opacity ${props.theme.base.transitionSpeed};
        }
    `}
`;