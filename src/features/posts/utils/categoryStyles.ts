import type { PostCategory } from '../api/posts.types';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * 카테고리별 Chip 스타일 반환
 */
export const getCategoryChipStyles = (category: PostCategory): SxProps<Theme> => {
  if (category === 'NOTICE') {
    return {
      backgroundColor: '#ffebee',
      color: '#c62828',
      '&:hover': {
        backgroundColor: '#ffcdd2',
      },
    };
  }

  if (category === 'QNA') {
    return {
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      '&:hover': {
        backgroundColor: '#bbdefb',
      },
    };
  }

  return {};
};

