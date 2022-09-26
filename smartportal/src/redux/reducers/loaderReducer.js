import {SHOW_LOADER,HIDE_LOADER} from '../actions/actionTypes';

const initialState = {
  loading:false
}

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading:action.data
      };
    case HIDE_LOADER:
      return {
        ...state,
        loading:action.data,
      };
    default:
      return state;
  }
}

export default loaderReducer;