import { SET_USER } from './actionTypes';

export const setUserMethod = (userData) => (
    {
      type: SET_USER,
      data: userData
    }
);