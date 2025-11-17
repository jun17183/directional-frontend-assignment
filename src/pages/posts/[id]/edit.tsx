import React, { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { isAuthenticated } from '@/features/auth/hooks/useAuth';
import { Layout } from '@/shared/components/layout/Layout';
import { PostForm } from '@/features/posts/components/PostForm';
import { usePost } from '@/features/posts/hooks/usePosts.queries';
import { useUpdatePost } from '@/features/posts/hooks/usePosts.mutations';
import type { UpdatePostDto } from '@/features/posts/api/posts.types';
import type { NextPageWithLayout } from '../../_app';

const EditPostPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const postId = typeof id === 'string' ? id : '';

  const { data: post, isLoading, error, refetch } = usePost(postId);
  const { mutate: updatePost, isPending, isError, error: updateError } = useUpdatePost(postId);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  const handleBack = () => {
    if (postId) {
      router.push(`/posts/${postId}`);
    } else {
      router.push('/posts');
    }
  };

  const handleSubmit = (data: UpdatePostDto) => {
    updatePost(data);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleBack}
            variant="outlined"
            sx={{
              color: '#616161',
              backgroundColor: '#f5f5f5',
              borderColor: '#bdbdbd',
              '&:hover': {
                backgroundColor: '#e0e0e0',
                borderColor: '#9e9e9e',
                color: '#424242',
              },
            }}
          >
            돌아가기
          </Button>
        </Box>
        <Alert severity="error">
          게시글을 불러오는데 실패했습니다.
          <Button onClick={() => refetch()} sx={{ ml: 2 }} variant="contained" color="primary">
            다시 시도
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        게시글 수정
      </Typography>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          게시글 수정에 실패했습니다. {updateError instanceof Error ? updateError.message : '알 수 없는 오류가 발생했습니다.'}
        </Alert>
      )}

      <PostForm 
        initialData={post} 
        onSubmit={handleSubmit} 
        isLoading={isPending} 
        submitLabel="수정하기"
        onBack={handleBack}
        backLabel="돌아가기"
      />
    </Box>
  );
};

EditPostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditPostPage;

