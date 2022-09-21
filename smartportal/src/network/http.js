import axios from 'axios';
import Config from 'react-native-config';

import isConnected from './network';

const baseURL = Config.BASE_URL;
const timeout = parseInt(Config.TIMEOUT, 10);
const httpClient = axios.create({
  baseURL,
  timeout,
});

const networkInterceptor = async config => {
  const isConnectedStatus = await isConnected();
  if (!isConnectedStatus) {
    return Promise.reject(
      new Error({
        message: 'Network Error',
      }),
    );
  }
  return config;
};

const authInterceptor = async config => {
  const newConfig = config;
  // Headers auth config
  return newConfig;
};

const errorInterceptor = async error => {
  if (error && error.response && error.response.status === 403) {
    // 403 handling
    return Promise.reject(new Error({message: 'Session Timeout'}));
  }
  // API failure handling
  return Promise.reject(
    (error && error.response && error.response.data) || error,
  );
};

const responseInterceptor = response => {
  // API success handling
  return Promise.resolve(response);
};

// TODO: map error response
const generateErrorBody = body => {
  return {
    errorCode: body.errorCode,
    description: body.errorDescription,
    message: {
      en: body.errorResponse.englishMessage,
      ar: body.errorResponse.arabicMessage,
    },
    code: body.errorResponse.code,
  };
};

httpClient.interceptors.request.use(networkInterceptor, error => {
  // Network failure handling
  return Promise.reject(error);
});
httpClient.interceptors.request.use(authInterceptor);

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
