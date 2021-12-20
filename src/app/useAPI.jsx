import axios from 'axios';
import hash from 'object-hash';
import React, { useEffect, useState } from 'react';
import { environment } from 'environment';
import { useToast } from 'ofd-ui-toolkit';

const STATUS_UNAUTHORIZED = 401;
const STATUS_DENIED = 403;

const authDecorator = (axiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    return {
      ...config,
      data: config.data || {},
      headers: {
        ...config.headers,
        Authorization: `bearer ${token}`,
      },
    };
  });

  axiosInstance.interceptors.response.use(undefined, (error) => {
    if (error?.request?.status === STATUS_UNAUTHORIZED) {
      localStorage.removeItem('token');
      window.location = '/login';
    }

    if (error?.request?.status === STATUS_DENIED) {
      window.location = '/403';
    }

    return Promise.reject(error);
  });

  return axiosInstance;
};

// TODO: add env
const axiosInstance = authDecorator(axios.create({
  baseURL: `${environment.dataApiUrl}`,
}));

const matchField = (key, dict) => {
  if (dict) {
    return dict.find((el) => el.key.toLowerCase() === key.toLowerCase()).value;
  }
  return null;
};

const { CancelToken } = axios;

/**
 * The object returned by the useAPI hook.
 * @typedef {Object} useAPIOutput
 * @property {Object|undefined} data - The data attribute from the axios response.
 * @property {Object|undefined} response - The axios response.
 * @property {Object|undefined} error - The axios error object if an error occurs.
 * @property {boolean} loading - Indicates if there is a pending API call.
 * @property {function} fetch - Function used to manually call a fetch method.
 */

/**
 * React hook used to make a an API call using axios.
 *
 *  ```
 *  const { data, response, error, loading, setData, fetch } = useAPI(url, config, initialFetch);
 *  ```
 *
 * Allows you to pass an [axios config object](https://github.com/axios/axios#request-config), for complete control of the request being sent.
 *
 * @param {Object} config={} - Axios config object passed to the axios.request method.
 * @param {boolean} initialFetch=true - Should the first api call automatically be made.
 * @returns {useAPIOutput} output
 */
const useAPI = (config = {}, initialFetch = true, errorFieldDict = null) => {
  const [ state, setState ] = useState({
    response: undefined,
    error: undefined,
    loading: null,
  });
  const configHash = hash(config);
  const toast = useToast();

  const source = CancelToken.source();

  const fetch = async (externalConfig) => {
    try {
      setState({ ...state, loading: true });

      const response = await axiosInstance({
        ...config,
        ...externalConfig,
        cancelToken: source.token,
      });

      setState({ error: undefined, response, loading: false });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request canceled by cleanup: ', error.message);
      } else {
        setState({ error, response: undefined, loading: false });
        if (error.response && Array.isArray(error.response.data)) {
          // console.log(errorFieldDict)
          const ErrorContent = error.response.data.map((el, i) => {
            const matchedField = matchField(el.error_field, errorFieldDict);

            return (
              <span
                key={`${el.error_field}-${i}`}
              >
                {el.error_field && matchedField ? `${matchedField}: ` : null}
                {el.error_text}
              </span>
            );
          });
          toast.add({
            type: 'error',
            content: ErrorContent,
          });
        } else if (error.response && error.response.data.error) {
          const errData = error.response.data;
          toast.add({
            type: 'error',
            content: errData.error_description,
          });
        } else if (error.response && error.response.data.message) {
          const errData = error.response.data;
          toast.add({
            type: 'error',
            content: errData.message,
          });
        } else {
          toast.add({
            type: 'error',
            content: error.message,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (initialFetch) {
      fetch();
    }

    return () => {
      source.cancel('useEffect cleanup.');
    };
  }, [configHash]);

  const { response, error, loading } = state;

  const data = response ? response.data : undefined;
  return {
    data,
    response,
    error,
    loading,
    fetch,
  };
};

export default useAPI;
