
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register } from '@/api/authentication';
import { save } from '@/utils/storage';




export const useAuthentication = () => {
  const queryClient = useQueryClient();

  
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      save(process.env.NEXT_PUBLIC_USER_ACCESS_TOKEN as string, data.accessToken)
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
    
  });


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


  const loginActions = {
    login: loginMutation.mutate,
    login_status: loginMutation.status ,
  };


  const registerActions = {
    register: registerMutation.mutate,
    register_status: registerMutation.isPending,
  };

  return { loginActions, registerActions };
};
