import { propertiesMap } from "../Helpers";

export const ThemeColors = {
    primary: '#FF9B3D',
    secondary: '#C9CCD1',
    text: '#333545',
    dark: '#262737',
    light: '#F5F7FA',
    white: '#FFFFFF',
    background: '#191a28',
    sidebar: '#1f202f',
    success: '#81A35A',
    error: '#E83C50',
    info: '#4C6EAC',
    black: '#000000'
};

export const FontSizes = {
    root: "10px",
    small: "1.2rem",
    base: "1.4rem",
    body: "1.6rem",
    headingFour: "1.8rem",
    headingThree: "2.2rem",
    headingTwo: "2.4rem",
    headingOne: "3rem"
};

export const Fonts = {
    body: '"Open Sans", sans-serif',
    heading: '"Muli", sans-serif'
};

export const CSSVariables = `
    :root {
        /* colors */
        ${propertiesMap(ThemeColors)}
        ${propertiesMap(Fonts, "font")}
        ${propertiesMap(FontSizes, "size")}
    }
`;