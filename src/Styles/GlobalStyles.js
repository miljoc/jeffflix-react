import { rgba } from "polished";
import { createGlobalStyle } from "styled-components";
import { HeadingBaseStyle } from "./Base";
import Reset from "./Reset";
import { CSSVariables } from "./Variables";

const GlobalStyles = createGlobalStyle`
	/* imports */
	${CSSVariables}
    ${Reset}

    html,
    body {
        font-size: var(--olaris--size-root);
    }

    body {
        background: var(--olaris--dark);
        font-size: var(--olaris--size-body);
        margin: 0;
        overflow: hidden;
    }

    * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    input,
    textarea,
    button,
    body {
        font-family: var(--olaris--font-body);
    }
    
    em {
        font-style: italic;
    }

    input{
        &::placeholder {
            color: ${(props) => rgba(props.theme.white, 0.1)};
        }
        
        &.input-light {
            &::placeholder {
                color: ${(props) => rgba(props.theme.black, 0.2)};
            }
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        ${HeadingBaseStyle}
    }

    a,
    button {
        cursor: pointer;
        text-decoration: none;

        &:focus {
            outline: none;
        }
    }
`;

export default GlobalStyles;