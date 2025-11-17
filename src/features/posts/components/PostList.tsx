import { Box, CircularProgress, Alert, Button, Typography, SelectChangeEvent } from '@mui/material';
import { usePosts } from '../hooks/usePosts.queries';
import { usePostListFilters } from '../hooks/usePostListFilters';
import { PostFilters } from './PostFilters';
import { PostTable } from './PostTable';
import { PostPagination } from './PostPagination';
import type { PostCategory } from '../api/posts.types';

export const PostList = () => {
  const {
    params,
    searchInput,
    setSearchInput,
    handleSortChange,
    handleCategoryChange,
    handleSearch,
    handleSearchReset,
    handleNextPage,
    handlePrevPage,
    handleRowClick,
  } = usePostListFilters();

  const { data, isLoading, error, refetch } = usePosts(params);

  const onCategoryChange = (event: SelectChangeEvent) => {
    const value = event.target.value as PostCategory | '';
    handleCategoryChange(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        게시글을 불러오는데 실패했습니다.
        <Button onClick={() => refetch()} sx={{ ml: 2 }}>
          다시 시도
        </Button>
      </Alert>
    );
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <Box>
        <PostFilters
          category={params.category || ''}
          searchInput={searchInput}
          onCategoryChange={onCategoryChange}
          onSearchInputChange={setSearchInput}
          onSearch={handleSearch}
          onSearchReset={handleSearchReset}
          onKeyPress={handleKeyPress}
        />

        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            게시글이 없습니다.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <PostFilters
        category={params.category || ''}
        searchInput={searchInput}
        onCategoryChange={onCategoryChange}
        onSearchInputChange={setSearchInput}
        onSearch={handleSearch}
        onSearchReset={handleSearchReset}
        onKeyPress={handleKeyPress}
      />

      <PostTable
        posts={data.items}
        currentSort={params.sort}
        currentOrder={params.order}
        onSortChange={handleSortChange}
        onRowClick={handleRowClick}
      />

      <PostPagination
        hasPrevCursor={!!data.prevCursor}
        hasNextCursor={!!data.nextCursor}
        onPrev={() => handlePrevPage(data.prevCursor)}
        onNext={() => handleNextPage(data.nextCursor)}
      />
    </Box>
  );
};

