import {SET_USER} from '../actions/actionTypes';

const initialState = {
    client_name_ar:'',
    client_name_en:'',
    client_email:'',
    bank_id: '',
    currency_ar: "",
    currency_en: "",
    iban: ""
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        client_name_ar: action.data.client_name_ar,
        client_name_en: action.data.client_name_en,
        client_email:   action.data.client_email,
        bank_id:        action.data.bank_id,
        currency_ar:    action.data.currency_ar,
        currency_en:    action.data.currency_en,
        iban:           action.data.iban
      };
    default:
      return state;
  }
}

export default userReducer;