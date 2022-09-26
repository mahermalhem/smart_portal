import { CHANGE_THEME } from './actionTypes';

export const changeThemeMethod = (theme) => (
    {
      type: CHANGE_THEME,
      data: theme
    }
);