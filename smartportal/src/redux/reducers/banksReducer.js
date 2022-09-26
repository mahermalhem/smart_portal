import {SET_BANKS} from '../actions/actionTypes';

const initialState = {
    banks:[
      {
          "bank_id": "1",
          "bank_name_ar": "البنك الفلسطيني ",
          "bank_name_en": "palestinian Bank ", 
          "bank_serial_number": "125698548"
      },
      {
          "bank_id": "2",
          "bank_name_ar": "تيست بنك",
          "bank_name_en": "Test Bank",
          "bank_serial_number": "256985489"
      }
  ]
}
const banksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BANKS:
      return {
        ...state,
        banks:action.data,
      };
    default:
      return state;
  }
}

export default banksReducer;