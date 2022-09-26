import { OPEN_PAYMENTS_BOTTOM_SHEET,CLOSE_PAYMENTS_BOTTOM_SHEET } from './actionTypes';
export const openPaymentBottomSheet = ({paymetns}) => (
    {
      type: OPEN_PAYMENTS_BOTTOM_SHEET,
      data: paymetns
    }
);
export const closePaymentBottomSheet = () => (
    {
      type: CLOSE_PAYMENTS_BOTTOM_SHEET,
    }
);