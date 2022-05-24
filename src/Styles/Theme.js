import { darken, lighten } from 'polished';
import { Fonts, FontSizes, ThemeColors } from './Variables';

const Theme = {
    ...ThemeColors,

    darken: {
        primary: darken(0.2, `${ThemeColors.primary}`),
        dark: darken(0.1, `${ThemeColors.dark}`),
        background: darken(0.1, `${ThemeColors.background}`),
    },
    lighten: {
        dark: lighten(0.2, `${ThemeColors.dark}`),
        background: lighten(0.1, `${ThemeColors.background}`),
    },
    alerts: {
        success: `${ThemeColors.success}`,
        error: `${ThemeColors.error}`,
        info: `${ThemeColors.info}`,

        darken: {
            success: darken(0.1, `${ThemeColors.success}`),
            error: darken(0.1, `${ThemeColors.error}`),
        },
    },
    layout: {
        header: '5rem',
        sidebar: '27.4rem',
        search: '30rem',
        player: '9rem',
        playerMobile: '18rem',
    },
    fonts: {
        ...Fonts
    },
    typography: {
        ...FontSizes
    },
    card: {
        width: '14rem',
        maxWidth: '18rem',
        margin: '0 1.5rem 3rem',
        paddingTop: 'calc(513 / 342 * 100%)',
        borderRadius: '0rem'
    },
    wideCard: {
        width: '20rem',
        maxWidth: '30rem',
        margin: '0 1.5rem 3rem',
        paddingTop: '12rem',
    },
    base: {
        transitionSpeed: '0.2s',
        borderRadius: '0.3rem'
    },
    button: {
        borderRadius: '0.3rem'
    }
};

export default Theme;
