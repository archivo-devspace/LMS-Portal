import axios from "axios";
import apiInstance from "../instance";
import { handleApiError } from "@/utils/common";

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
  try {
    const response = await apiInstance.post("/users/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "An error occurred during login");
  }
};

export const register = async ({
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
}: RegisterInput) => {
  try {
    const response = await apiInstance.post("/users/register", {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "An error occurred during registration");
  }
};
