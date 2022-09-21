import {CLEAR_DATA, SAVE_DATA} from './actionTypes';

const storeData = (data) => {
  return {
    type: SAVE_DATA,
    data,
  };
};

const clearData = () => {
  return {
    type: CLEAR_DATA,
  };
};

export {storeData, clearData};
