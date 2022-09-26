import { createStore,applyMiddleware ,combineReducers } from 'redux';
import themeReducer from '../reducers/themeReducer'
import languageReducer from '../reducers/languageReducer';
import loaderReducer from '../reducers/loaderReducer';
import bottomActionSheetReducer from '../reducers/bottomActionSheetReducer';
import payementsBottomActionSheetReducer from '../reducers/payementsBottomActionSheetReducer';
import userReducer from '../reducers/userReducer';
import pinCodeBottomActionSheetReducer from '../reducers/pinCodeBottomActionSheetReducer';
import banksReducer from '../reducers/banksReducer';
import purposesReducer from '../reducers/purposesReducer';
// import thunk from 'redux-thunk';
// import {persistStore, persistReducer} from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['themeState'],
// };

const rootReducer = combineReducers({
    themeReducer,
    languageReducer,
    loaderReducer,
    bottomActionSheetReducer,
    payementsBottomActionSheetReducer,
    userReducer,
    pinCodeBottomActionSheetReducer,
    banksReducer,
    purposesReducer
})

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middlewaresToApply = [thunk];

// eslint-disable-next-line no-undef
// if (__DEV__) {
//   const createFlipperDebugger = require('redux-flipper').default;
//   middlewaresToApply.push(createFlipperDebugger());
// }

// const configureStore = () => createStore(persistedReducer,applyMiddleware(...middlewaresToApply));
const configureStore = () => createStore(rootReducer);

export default configureStore;

//couldn't implement this return --maher
// export default () => {
//     const store = createStore(
//       persistedReducer,
//       applyMiddleware(...middlewaresToApply),
//     );
//     const persistor = persistStore(store);
//     return {store, persistor};
// };
