import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, CircularProgress } from '@mui/material';
import { isAuthenticated } from '@/features/auth/hooks/useAuth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인
    if (isAuthenticated()) {
      // 로그인되어 있으면 게시글 목록으로
      router.replace('/posts');
    } else {
      // 로그인되어 있지 않으면 로그인 페이지로
      router.replace('/login');
    }
  }, [router]);

  // 리다이렉트 중 로딩 표시
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

