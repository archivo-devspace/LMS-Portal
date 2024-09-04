// src/api/authentication.ts
import axios from 'axios';

// Define the types for authentication responses and errors
export interface AuthResponse {
  token: string; // Example: assuming a token is returned on successful authentication
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface AuthError {
  message: string; // Example: assuming error messages are strings
}

// Define types for input parameters
export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  username: string;
}

// API function for login
export const login = async ({ email, password }: LoginInput): Promise<AuthResponse> => {
  const response = await axios.post('/api/login', { email, password });
  return response.data;
};

// API function for register
export const register = async ({ email, password, username }: RegisterInput): Promise<AuthResponse> => {
  const response = await axios.post('/api/register', { email, password, username });
  return response.data;
};
