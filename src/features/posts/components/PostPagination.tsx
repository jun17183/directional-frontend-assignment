import { Box, Button } from '@mui/material';

interface PostPaginationProps {
  hasPrevCursor: boolean;
  hasNextCursor: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const PostPagination = ({
  hasPrevCursor,
  hasNextCursor,
  onPrev,
  onNext,
}: PostPaginationProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
      <Button
        variant="outlined"
        onClick={onPrev}
        disabled={!hasPrevCursor}
      >
        이전
      </Button>
      <Button
        variant="outlined"
        onClick={onNext}
        disabled={!hasNextCursor}
      >
        다음
      </Button>
    </Box>
  );
};

