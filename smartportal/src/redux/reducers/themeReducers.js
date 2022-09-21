import {SAVE_THEME} from '_redux/actions/actionTypes';
import {themes} from '_styles/theming';

const initialState = {
  data: {theme: themes.default},
};

const themeReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_THEME:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default themeReducers;
