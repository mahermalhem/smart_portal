import {CLEAR_DATA, SAVE_DATA} from '_redux/actions/actionTypes';

const initialState = {
  data: {},
};

const dataReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DATA:
      return {
        ...state,
        data: action.data,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default dataReducers;
