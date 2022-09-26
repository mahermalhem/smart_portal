import { OPEN_PIN_CODE_BOTTOM_SHEET,CLOSE_PIN_CODE_BOTTOM_SHEET } from './actionTypes';
export const openPinCodeBottomSheet = () => (
    {
      type: OPEN_PIN_CODE_BOTTOM_SHEET,
      data: true
    }
);
export const closePinCodeBottomSheet = () => (
    {
      type: CLOSE_PIN_CODE_BOTTOM_SHEET,
      data: false
    }
);