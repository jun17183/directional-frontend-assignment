import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { createPost, updatePost, deletePost } from '../api/posts.api';
import type { CreatePostDto, UpdatePostDto } from '../api/posts.types';
import { postKeys } from './usePosts.queries';

/**
 * 게시글 생성 Hook
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreatePostDto) => createPost(data),
    onSuccess: (newPost) => {
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      
      toast.success('게시글이 작성되었습니다');
      
      // 작성된 게시글 상세 페이지로 이동
      router.push(`/posts/${newPost.id}`);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : '게시글 작성에 실패했습니다');
    },
  });
};

/**
 * 게시글 수정 Hook
 */
export const useUpdatePost = (postId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdatePostDto) => updatePost(postId, data),
    onSuccess: (updatedPost) => {
      // 해당 게시글 캐시 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      
      toast.success('게시글이 수정되었습니다');
      
      // 상세 페이지로 이동
      router.push(`/posts/${updatedPost.id}`);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : '게시글 수정에 실패했습니다');
    },
  });
};

/**
 * 게시글 삭제 Hook
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      // 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      
      toast.success('게시글이 삭제되었습니다');
      
      // 목록 페이지로 이동
      router.push('/posts');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : '게시글 삭제에 실패했습니다');
    },
  });
};

