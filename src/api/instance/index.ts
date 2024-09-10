import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

// Configuration constants
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://lms-backend-service-production.vercel.app";
const USER_TOKEN_KEY = process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN as string;
const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_USER_REFRESH_TOKEN as string;
const AUTH_HEADER = "Authorization";
const BEARER_PREFIX = "Bearer ";

// Create an Axios instance with credentials included
const apiInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 180000, // 3 mins
  withCredentials: true,
});

// Helper function to get cookies
const getCookie = (key: string): string | undefined => Cookies.get(key);

// Helper function to set cookies
const setCookie = (key: string, value: string): any => Cookies.set(key, value);

//Helper function to remove cookies
const removeCookie = (key: string): void => Cookies.remove(key);

// Function to set authorization token in request headers
const setAuthToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getCookie(USER_TOKEN_KEY);
  if (token && config.headers) {
    config.headers[AUTH_HEADER] = `${BEARER_PREFIX}${token}`;
  }
  return config;
};

// Function to handle access token refresh
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getCookie(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    return null;
  }

  try {
    const response: AxiosResponse<{
      accessToken: string;
      refreshToken: string;
    }> = await axios.post(
      `${BASE_URL}/users/refresh-token`,
      { refreshToken },
      { withCredentials: true }
    );

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;
    setCookie(USER_TOKEN_KEY, newAccessToken); // Update access token in cookies
    setCookie(REFRESH_TOKEN_KEY, newRefreshToken); // Update refresh token in cookies

    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

// Function to handle unauthorized response and retry request
const handleUnauthorizedError = async (error: any) => {
  const originalRequest = error.config;

  // Check if error is due to unauthorized access and retry is not set
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true; // Custom flag to prevent infinite loop

    const newAccessToken = await refreshAccessToken();
    if (!newAccessToken) {
      removeCookie(USER_TOKEN_KEY); // Removes the user token cookie
      removeCookie(REFRESH_TOKEN_KEY);
      window.location.href = "/login"; // Redirect to login if token refresh fails
      return;
    }

    originalRequest.headers[AUTH_HEADER] = `${BEARER_PREFIX}${newAccessToken}`;
    return apiInstance(originalRequest); // Retry the original request with the new access token
  }

  return Promise.reject(error);
};

// Add request interceptor to include auth token
apiInstance.interceptors.request.use(setAuthToken);

// Add response interceptor to handle token expiration and refresh
apiInstance.interceptors.response.use(
  (response) => response,
  handleUnauthorizedError
);

export default apiInstance;
