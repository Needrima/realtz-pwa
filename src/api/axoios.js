import axios from 'axios';

// Create an instance of Axios with a custom configuration
const axiosUserInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_USER_URL, // Set your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosUserInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle response error
      if (error?.response?.status === 401) {
        console.log('anauthorized user', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = "/login"
      }
      return Promise.reject(error);
    }
  );

  // Create an instance of Axios with a custom configuration
const axiosProductInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_PRODUCT_URL, // Set your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosProductInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle response error
      if (error?.response?.status === 401) {
        console.log('anauthorized user', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = "/login"
      }
      return Promise.reject(error);
    }
);

  // Create an instance of Axios with a custom configuration
  const axiosNotificationInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_NOTIFICATION_URL, // Set your base URL
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  axiosNotificationInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Handle response error
        if (error?.response?.status === 401) {
          console.log('anauthorized user', error)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          window.location.href = "/login"
        }
        return Promise.reject(error);
      }
  );

export {axiosUserInstance, axiosProductInstance, axiosNotificationInstance};
