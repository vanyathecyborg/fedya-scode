const STATUS_UNAUTHORIZED = 401;

const authDecorator = (axiosInstance) => {
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    return {
      ...config,
      data: config.data || {},
      headers: {
        ...config.headers,
        'Authorization': `bearer ${token}`,
      },
    };
  });

  axiosInstance.interceptors.response.use(undefined, (error) => {
    if (error?.request?.status === STATUS_UNAUTHORIZED) {
      localStorage.removeItem('token');
      window.location = '/login';
    }

    return Promise.reject(error);
  });

  return axiosInstance;
}

export default authDecorator;
