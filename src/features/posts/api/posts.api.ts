import { apiClient } from '@/shared/lib/axios';
import type {
  Post,
  PostsResponse,
  CreatePostDto,
  UpdatePostDto,
  PostQueryParams,
  DeletePostResponse,
} from './posts.types';

/**
 * 게시글 목록 조회
 * GET /posts
 * 
 * 양방향 커서 기반 페이지네이션 지원
 * prevCursor/nextCursor 동시 사용 불가
 */
export const fetchPosts = async (params: PostQueryParams = {}): Promise<PostsResponse> => {
  const response = await apiClient.get<PostsResponse>('/posts', { params });
  return response.data;
};

/**
 * 게시글 단일 조회
 * GET /posts/:id
 */
export const fetchPost = async (id: string): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

/**
 * 게시글 생성
 * POST /posts
 * 
 * @returns 201 Created
 */
export const createPost = async (data: CreatePostDto): Promise<Post> => {
  const response = await apiClient.post<Post>('/posts', data);
  return response.data;
};

/**
 * 게시글 수정
 * PATCH /posts/:id
 * 
 * 최소 1개 필드 필요
 */
export const updatePost = async (id: string, data: UpdatePostDto): Promise<Post> => {
  const response = await apiClient.patch<Post>(`/posts/${id}`, data);
  return response.data;
};

/**
 * 게시글 삭제
 * DELETE /posts/:id
 * 
 * @returns { ok: true, deleted: 1 }
 */
export const deletePost = async (id: string): Promise<DeletePostResponse> => {
  const response = await apiClient.delete<DeletePostResponse>(`/posts/${id}`);
  return response.data;
};

