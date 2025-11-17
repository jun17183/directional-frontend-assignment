import { useRouter } from 'next/router';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Post } from '../api/posts.types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../constants';
import { getCategoryChipStyles } from '../utils/categoryStyles';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${post.id}`);
  };

  const formattedDate = format(new Date(post.createdAt), 'yyyy.MM.dd HH:mm', {
    locale: ko,
  });

  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
        },
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
          <Chip
            label={CATEGORY_LABELS[post.category]}
            color={CATEGORY_COLORS[post.category]}
            size="small"
            sx={getCategoryChipStyles(post.category)}
          />
          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>

        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 1,
          }}
        >
          {post.body}
        </Typography>

        {post.tags && post.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
            {post.tags.map((tag, index) => (
              <Chip
                key={index}
                label={`#${tag}`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

