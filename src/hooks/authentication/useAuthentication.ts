import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "@/api/authentication";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useAuthentication = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      Cookies.set(
        process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN as string,
        data.accessToken
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

  return { loginActions, registerActions };
};
