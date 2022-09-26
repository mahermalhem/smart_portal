import { OPEN_BOTTOM_SHEET,CLOSE_BOTTOM_SHEET } from './actionTypes';
export const openBottomSheet = () => (
    {
      type: OPEN_BOTTOM_SHEET,
      data: true
    }
);
export const hideBottomSheet = () => (
    {
      type: CLOSE_BOTTOM_SHEET,
      data: false
    }
);