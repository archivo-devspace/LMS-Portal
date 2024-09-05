import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const USER_TOKEN_KEY = process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN as string;
const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_USER_REFRESH_TOKEN as string;

// Create an Axios instance with credentials included
const apiInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 180000, // 3 mins
  withCredentials: true, // Include cookies in requests
});

// Function to set authorization token
const setAuthToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = Cookies.get(USER_TOKEN_KEY);

  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

// Function to refresh the access token
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    return null;
  }

  try {
    const response: AxiosResponse<{ accessToken: string }> = await axios.post(
      `${BASE_URL}/users/refresh-token`,
      { refreshToken },
      { withCredentials: true } // Ensure credentials are included when refreshing the token
    );

    const newAccessToken = response.data.accessToken;
    Cookies.set(USER_TOKEN_KEY, newAccessToken); // Update the access token in cookies
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

// Add request interceptor to include auth token
apiInstance.interceptors.request.use(setAuthToken);

// Add response interceptor to handle token expiration and refresh
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is due to unauthorized access and retry is not set
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Custom flag to prevent infinite loop

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiInstance(originalRequest); // Retry the original request with new access token
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
