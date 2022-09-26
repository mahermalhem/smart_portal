import { CLOSE_PIN_CODE_BOTTOM_SHEET, OPEN_PIN_CODE_BOTTOM_SHEET } from '../actions/actionTypes';

const initialState = {
    isOpenPinCodeBottomActionSheet: false,
}
const pinCodeBottomActionSheetReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_PIN_CODE_BOTTOM_SHEET:
            return {
                ...state,
                payments: action.data,
                isOpenPinCodeBottomActionSheet: true
            };
        case CLOSE_PIN_CODE_BOTTOM_SHEET:
            return {
                ...state,
                isOpenPinCodeBottomActionSheet: false
            };
        default:
            return state;
    }
}

export default pinCodeBottomActionSheetReducer;