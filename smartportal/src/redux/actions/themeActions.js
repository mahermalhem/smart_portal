import {SAVE_THEME} from './actionTypes';

const updateTheme = (data) => {
  return {
    type: SAVE_THEME,
    data: {theme: data},
  };
};

export default updateTheme;
