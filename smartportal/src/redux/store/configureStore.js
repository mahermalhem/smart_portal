import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import rootReducer from '../reducers/index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['themeState'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewaresToApply = [thunk];

// eslint-disable-next-line no-undef
if (__DEV__) {
  const createFlipperDebugger = require('redux-flipper').default;
  middlewaresToApply.push(createFlipperDebugger());
}

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(...middlewaresToApply),
  );
  const persistor = persistStore(store);
  return {store, persistor};
};
