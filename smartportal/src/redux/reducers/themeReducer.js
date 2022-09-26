import {CHANGE_THEME,CHANGE_DIRECTION} from '../actions/actionTypes';

const initialState = {
  theme:['#1A2980', '#26D0CE', '#192f6a'],
  isRtl:false,
}
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme:action.data
      };
    case CHANGE_DIRECTION:
      return {
        ...state,
        isRtl:action.data,
      };
    default:
      return state;
  }
}

export default themeReducer;