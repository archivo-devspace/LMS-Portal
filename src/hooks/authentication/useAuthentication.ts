// src/hooks/useAuthentication.ts
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { login, register } from '@/api/authentication';



// Define the useAuthentication hook
export const useAuthentication = () => {
  const queryClient = useQueryClient();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
    
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  // Grouping login-related functionality
  const loginActions = {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isLoading ,
    loginError: loginMutation.error,
  };

  // Grouping register-related functionality
  const registerActions = {
    register: registerMutation.mutate,
    isRegistering: registerMutation.isLoading,
    registerError: registerMutation.error,
  };

  return { loginActions, registerActions };
};
