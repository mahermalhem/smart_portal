import {CHANGE_LANGUAGE} from '../actions/actionTypes';
//import I18n from 'react-native-i18n';

const initialState = {
  isRtl:false,
  appLanguage:"en"
}
const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      //I18n.locale = action.data.appLanguage
      return {
        ...state,
        appLanguage:action.data.appLanguage,
        isRtl:(action.data.appLanguage=="ar" || action.data.appLanguage=='he')?true:false,
      };
    default:
      return state;
  }
}

export default languageReducer;