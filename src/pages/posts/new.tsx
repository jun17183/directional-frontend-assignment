import React, { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Alert } from '@mui/material';
import { isAuthenticated } from '@/features/auth/hooks/useAuth';
import { Layout } from '@/shared/components/layout/Layout';
import { PostForm } from '@/features/posts/components/PostForm';
import { useCreatePost } from '@/features/posts/hooks/usePosts.mutations';
import type { CreatePostDto, UpdatePostDto } from '@/features/posts/api/posts.types';
import type { NextPageWithLayout } from '../_app';

const NewPostPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { mutate: createPost, isPending, isError, error } = useCreatePost();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  const handleBack = () => {
    router.push('/posts');
  };

  const handleSubmit = (data: CreatePostDto | UpdatePostDto) => {
    createPost(data as CreatePostDto);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        게시글 작성
      </Typography>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          게시글 작성에 실패했습니다. {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
        </Alert>
      )}

      <PostForm 
        onSubmit={handleSubmit} 
        isLoading={isPending} 
        submitLabel="작성하기"
        onBack={handleBack}
        backLabel="목록으로"
      />
    </Box>
  );
};

NewPostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewPostPage;

