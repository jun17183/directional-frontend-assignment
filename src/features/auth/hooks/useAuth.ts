import { useMutation } from '@tanstack/react-query';
import { loginApi, LoginRequest, LoginResponse } from '../api/auth.api';

/**
 * 로그인 Hook
 */
export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials: LoginRequest) => loginApi(credentials),
    onSuccess: (data) => {
      // 토큰을 localStorage에 저장
      localStorage.setItem('auth_token', data.token);
    },
  });
};

/**
 * 로그아웃 함수
 */
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

/**
 * 토큰 확인 함수
 */
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

/**
 * 로그인 상태 확인 함수
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

