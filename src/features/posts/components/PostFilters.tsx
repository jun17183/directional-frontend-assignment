import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { PostCategory } from '../api/posts.types';

interface PostFiltersProps {
  category: PostCategory | '';
  searchInput: string;
  onCategoryChange: (event: SelectChangeEvent) => void;
  onSearchInputChange: (value: string) => void;
  onSearch: () => void;
  onSearchReset: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const PostFilters = ({
  category,
  searchInput,
  onCategoryChange,
  onSearchInputChange,
  onSearch,
  onSearchReset,
  onKeyPress,
}: PostFiltersProps) => {
  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>카테고리</InputLabel>
        <Select
          value={category}
          onChange={onCategoryChange}
          label="카테고리"
          sx={{
            backgroundColor: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
          }}
        >
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="NOTICE">공지사항</MenuItem>
          <MenuItem value="QNA">질문답변</MenuItem>
          <MenuItem value="FREE">자유게시판</MenuItem>
        </Select>
      </FormControl>

      <TextField
        size="small"
        placeholder="제목 또는 본문 검색..."
        value={searchInput}
        onChange={(e) => onSearchInputChange(e.target.value)}
        onKeyPress={onKeyPress}
        sx={{ 
          flexGrow: 1, 
          maxWidth: 400,
          backgroundColor: 'white',
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchInput && (
                <IconButton size="small" onClick={onSearchReset} color="primary">
                  <ClearIcon fontSize="small" />
                </IconButton>
              )}
              <IconButton size="small" onClick={onSearch} color="primary">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

