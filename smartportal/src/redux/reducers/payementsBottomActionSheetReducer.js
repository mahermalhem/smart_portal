import { CLOSE_PAYMENTS_BOTTOM_SHEET, OPEN_PAYMENTS_BOTTOM_SHEET } from '../actions/actionTypes';

const initialState = {
    payments: [],
    isOpenPaymentBottomActionSheet: false,
}
const payementsBottomActionSheetReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_PAYMENTS_BOTTOM_SHEET:
            return {
                ...state,
                payments: action.data,
                isOpenPaymentBottomActionSheet: true
            };
        case CLOSE_PAYMENTS_BOTTOM_SHEET:
            return {
                ...state,
                isOpenPaymentBottomActionSheet: false
            };
        default:
            return state;
    }
}

export default payementsBottomActionSheetReducer;