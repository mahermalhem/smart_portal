import {combineReducers} from 'redux';
import dataReducers from './dataReducers';
import themeReducers from './themeReducers';

export default combineReducers({
  dataState: dataReducers,
  themeState: themeReducers,
});
