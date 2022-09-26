import {SET_PURPOSES} from '../actions/actionTypes';

const initialState = {
    purposes:{
      "ar": {
          "1": "الأجهزة الإلكترونية",
          "2": "السيارات",
          "3": "الإسكان والعقارات",
          "4": "أثاث المنزل",
          "5": "البضائع التجارية",
          "6": "مواد أولية"
      },
      "en": {
          "1": "Electronic devices",
          "2": "Autos",
          "3": "Housing and realestate",
          "4": "Furniture",
          "5": "Commercial merchandise",
          "6": "Raw materials"
      }
  }
}
const purposesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PURPOSES:
      return {
        ...state,
        purposes:action.data,
      };
    default:
      return state;
  }
}

export default purposesReducer;