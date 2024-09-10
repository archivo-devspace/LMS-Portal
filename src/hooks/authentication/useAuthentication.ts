"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoginProfile, login, register } from "@/api/authentication";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: String;
  status: String;
  updatedAt: String;
  createdAt: String;
}

export const useAuthentication = () => {
  const queryClient = useQueryClient();
  const pathNmae = usePathname();

  const loginUserQuery = useQuery<UserProfile>({
    queryKey: ["user"],
    queryFn: getLoginProfile,
    enabled: pathNmae === "/setting/profile",
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      Cookies.set(
        process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN as string,
        data.accessToken
      );
      Cookies.set(
        process.env.NEXT_PUBLIC_USER_REFRESH_TOKEN as string,
        data.refreshToken
      );

      queryClient.invalidateQueries({ queryKey: ["user"] });
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const logout = () => {
    Cookies.remove(process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN as string);
    Cookies.remove(process.env.NEXT_PUBLIC_USER_REFRESH_TOKEN as string);
    queryClient.clear();
    window.location.href = "/login";
  };

  const loginActions = {
    login: loginMutation.mutate,
    login_data: loginMutation.data,
    login_status: loginMutation.status,
    login_error: loginMutation.error,
  };

  const registerActions = {
    register: registerMutation.mutate,
    register_data: registerMutation.data,
    register_status: registerMutation.isPending,
    register_error: registerMutation.error,
  };

  return { loginActions, registerActions, loginUserQuery, logout };
};
