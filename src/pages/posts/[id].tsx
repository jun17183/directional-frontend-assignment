import React, { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { isAuthenticated } from '@/features/auth/hooks/useAuth';
import { Layout } from '@/shared/components/layout/Layout';
import { usePost } from '@/features/posts/hooks/usePosts.queries';
import { useDeletePost } from '@/features/posts/hooks/usePosts.mutations';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/features/posts/constants';
import { getCategoryChipStyles } from '@/features/posts/utils/categoryStyles';
import type { NextPageWithLayout } from '../_app';

const PostDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const postId = typeof id === 'string' ? id : '';

  const { data: post, isLoading, error, refetch } = usePost(postId);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  const handleBack = () => {
    router.push('/posts');
  };

  const handleEdit = () => {
    router.push(`/posts/${postId}/edit`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deletePost(postId);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
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
            목록으로
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

  const formattedDate = format(new Date(post.createdAt), 'yyyy년 MM월 dd일 HH:mm', {
    locale: ko,
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 3 }}>
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
          목록으로
        </Button>
        <Button 
          variant="contained" 
          startIcon={<EditIcon />} 
          onClick={handleEdit}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          수정
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          startIcon={<DeleteIcon />} 
          onClick={handleDeleteClick} 
          disabled={isDeleting}
        >
          삭제
        </Button>
      </Box>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Chip
            label={CATEGORY_LABELS[post.category]}
            color={CATEGORY_COLORS[post.category] as 'error' | 'primary' | 'default'}
            size="medium"
            sx={getCategoryChipStyles(post.category)}
          />
          <Typography variant="body2" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>

        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          {post.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: 1.8,
            mb: 3,
          }}
        >
          {post.body}
        </Typography>

        {post.tags && post.tags.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {post.tags.map((tag, index) => (
              <Chip key={index} label={`#${tag}`} size="small" variant="outlined" />
            ))}
          </Stack>
        )}
      </Paper>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>게시글 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>취소</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PostDetailPage;

