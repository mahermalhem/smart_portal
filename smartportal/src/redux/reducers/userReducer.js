import {SET_USER} from '../actions/actionTypes';

const initialState = {
  id: 2,
  type: "job_seeker",
  status: "active",
  username: "maher2",
  email: "maher.malhem2@gmail.com",
  phone: "962770072863",
  verification_code: "",
  device_token: "hello",
  access_token: "-Vm5zAvtwLUnbUc5HMK4q4Q33h07zO5u1664319362"
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