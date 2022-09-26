import { SET_BANKS } from './actionTypes';

export const setBanksMethod = (banks) => (
    {
      type: SET_BANKS,
      data: banks
    }
);