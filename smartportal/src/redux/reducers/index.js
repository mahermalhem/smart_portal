import {combineReducers} from 'redux';
import {themeReducer} from './themeReducer';
import {languageReducer} from './languageReducer';
import {loaderRedcer} from './loaderReducer'
import {bottomActionSheetReducer} from './bottomActionSheetReducer'
import {userReducer} from './userReducer';
export default rootReducer= () => combineReducers({
  themeReducer,
  languageReducer,
  loaderRedcer,
  bottomActionSheetReducer,
  userReducer
});
