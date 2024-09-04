
import axios from 'axios';
import apiInstance from '../instance';



export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}


export const login = async ({ email, password }: LoginInput) => {
  const response = await apiInstance.post('/users/login', { email, password });
  return response.data;
};


export const register = async ({ email, password, confirmPassword, firstName, lastName }: RegisterInput) => {
  const response = await apiInstance.post('/users/register', { email, password, confirmPassword, firstName, lastName });
  return response.data;
};
