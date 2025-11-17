import { apiClient } from '@/shared/lib/axios';

/**
 * 로그인 요청 타입
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 사용자 정보 타입
 */
export interface User {
  id: string;
  email: string;
}

/**
 * 로그인 응답 타입
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * 로그인 API
 * POST /auth/login
 */
export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

