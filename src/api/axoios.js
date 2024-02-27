import axios from 'axios';

// Create an instance of Axios with a custom configuration
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Set your base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle response error
      // if (error?.response?.status === 401) {
      //   sessionStorage.removeItem('token')
      //   sessionStorage.removeItem('user')
      //   window.location.href = "/login"
      // }
      return Promise.reject(error);
    }
  );

// // You can also add interceptors for request and response
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Do something with the request config
//     // For example, you can add an authorization token
//     // config.headers['Authorization'] = 'Bearer your_token';
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
