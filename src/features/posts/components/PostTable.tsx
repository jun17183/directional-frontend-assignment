import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TableSortLabel,
  Typography,
  Box,
} from '@mui/material';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Post, Sort, Order } from '../api/posts.types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../constants';
import { getCategoryChipStyles } from '../utils/categoryStyles';

interface PostTableProps {
  posts: Post[];
  currentSort: Sort | undefined;
  currentOrder: Order | undefined;
  onSortChange: (sortField: Sort) => void;
  onRowClick: (postId: string) => void;
}

export const PostTable = ({
  posts,
  currentSort,
  currentOrder,
  onSortChange,
  onRowClick,
}: PostTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="12%">카테고리</TableCell>
            <TableCell width="40%">
              <TableSortLabel
                active={currentSort === 'title'}
                direction={currentSort === 'title' ? currentOrder : 'asc'}
                onClick={() => onSortChange('title')}
              >
                제목
              </TableSortLabel>
            </TableCell>
            <TableCell width="33%">태그</TableCell>
            <TableCell width="15%">
              <TableSortLabel
                active={currentSort === 'createdAt'}
                direction={currentSort === 'createdAt' ? currentOrder : 'asc'}
                onClick={() => onSortChange('createdAt')}
              >
                작성일
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => onRowClick(post.id)}
            >
              <TableCell>
                <Chip
                  label={CATEGORY_LABELS[post.category]}
                  color={CATEGORY_COLORS[post.category]}
                  size="small"
                  sx={getCategoryChipStyles(post.category)}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {post.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {post.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={`#${tag}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                {format(new Date(post.createdAt), 'yyyy.MM.dd HH:mm', { locale: ko })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

