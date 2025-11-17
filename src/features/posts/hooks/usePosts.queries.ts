import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchPosts, fetchPost } from '../api/posts.api';
import type { Post, PostsResponse, PostQueryParams } from '../api/posts.types';

/**
 * Query Keys
 */
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (params: PostQueryParams) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

/**
 * 게시글 목록 조회 Hook
 */
export const usePosts = (
  params: PostQueryParams = {}
): UseQueryResult<PostsResponse, Error> => {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => fetchPosts(params),
    staleTime: 30 * 1000, // 30초
  });
};

/**
 * 게시글 단일 조회 Hook
 */
export const usePost = (id: string): UseQueryResult<Post, Error> => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });
};

