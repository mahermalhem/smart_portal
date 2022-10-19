import {SET_USER} from '../actions/actionTypes';

const initialState = {
  id: 100000,
  type: "employee",
  status: "active",
  username: "test",
  email: "test",
  phone: "00",
  verification_code: "",
  device_token: "test",
  access_token: "test"
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        id:                     action.data.id,
        type:                   action.data.type,
        status:                 action.data.status,
        username:               action.data.username,
        email:                  action.data.email,
        phone:                  action.data.phone,
        verification_code:      action.data.verification_code,
        device_token:           action.data.device_token,
        access_token:           action.data.access_token,
      };
    default:
      return state;
  }
}

export default userReducer;