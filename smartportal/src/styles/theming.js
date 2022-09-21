import {createTheming} from '@callstack/react-theme-provider';

export const themes = {
  default: {
    primaryColor: 'rgb(38, 129, 200)',
  },
  dark: {
    primaryColor: 'rgb(63, 174, 67)',
  },
  other: {
    primaryColor: 'rgb(58, 55, 114)',
  },
};

const {ThemeProvider, withTheme, useTheme} = createTheming(themes.default);

export {ThemeProvider, withTheme, useTheme};
