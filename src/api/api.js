import axios from 'axios';

const BACKEND_URL = `https://4.react.pages.academy/wtw`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const createAPI = (onError, onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccessHandler = (response) => response;

  const onErrorHandler = (err) => {
    const {response} = err;

    if (!response) {
      onError(response.data.error);
      throw err;
    }

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized(response.config);

      throw err;
    }

    switch (response.status) {
      case Error.INTERNAL_ERROR:
      case Error.SERVICE_UNAVAILABLE:
      case Error.BAD_REQUEST:
        onError(response.data.error);
        throw err;
      default:
        onError(response.data.error);
        throw err;
    }
  };

  api.interceptors.response.use(onSuccessHandler, onErrorHandler);

  return api;
};
