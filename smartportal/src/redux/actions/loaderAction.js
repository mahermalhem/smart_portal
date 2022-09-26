import { SHOW_LOADER,HIDE_LOADER } from './actionTypes';

export const showLoader = () => (
    {
      type: SHOW_LOADER,
      data: true
    }
);
export const hideLoader = () => (
    {
      type: HIDE_LOADER,
      data: false
    }
);