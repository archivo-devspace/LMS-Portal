import axios from "axios";

export const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || defaultMessage);
  } else {
    throw new Error('An unknown error occurred');
  }
};