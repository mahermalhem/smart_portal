import {OPEN_BOTTOM_SHEET,CLOSE_BOTTOM_SHEET} from '../actions/actionTypes';

const initialState = {
  openBottomSheet:false
}

const bottomActionSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_BOTTOM_SHEET:
      return {
        ...state,
        openBottomSheet:true
      };
    case CLOSE_BOTTOM_SHEET:
      return {
        ...state,
        openBottomSheet:false,
      };
    default:
      return state;
  }
}

export default bottomActionSheetReducer;