import { useEffect, ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { isAuthenticated } from '@/features/auth/hooks/useAuth';
import { Layout } from '@/shared/components/layout/Layout';
import { PostList } from '@/features/posts/components/PostList';
import { createSamplePosts } from '@/features/posts/utils/createSamplePosts';
import type { NextPageWithLayout } from '../_app';

const PostsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // 로그인 체크
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  const handleNewPost = () => {
    router.push('/posts/new');
  };

  const handleCreateSampleData = async () => {
    if (confirm('25개의 샘플 게시글을 생성하시겠습니까?')) {
      setIsCreating(true);
      try {
        await createSamplePosts(25);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        // 페이지 새로고침
        window.location.reload();
      } catch (error) {
        alert('샘플 데이터 생성에 실패했습니다.');
      } finally {
        setIsCreating(false);
      }
    }
  };

  return (
    <Box>
      {showSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          샘플 게시글 생성이 완료되었습니다!
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          게시글 목록
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<DataObjectIcon />}
            onClick={handleCreateSampleData}
            disabled={isCreating}
          >
            {isCreating ? '생성 중...' : '샘플 데이터 생성'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewPost}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            글쓰기
          </Button>
        </Box>
      </Box>

      <PostList />
    </Box>
  );
};

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PostsPage;

