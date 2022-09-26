import { SET_PURPOSES } from './actionTypes';

export const setPurposesMethod = (purposes) => (
    {
      type: SET_PURPOSES,
      data: purposes
    }
);