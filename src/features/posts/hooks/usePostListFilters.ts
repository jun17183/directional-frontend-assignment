import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import type { PostQueryParams, PostCategory, Sort } from '../api/posts.types';
import { DEFAULT_PAGE_LIMIT, DEFAULT_SORT } from '../constants';

/**
 * PostList의 필터 및 정렬 상태 관리 Hook
 */
export const usePostListFilters = () => {
  const router = useRouter();
  const [params, setParams] = useState<PostQueryParams>({
    limit: DEFAULT_PAGE_LIMIT,
    ...DEFAULT_SORT,
  });
  const [searchInput, setSearchInput] = useState('');

  /**
   * 커서 초기화와 함께 params 업데이트
   */
  const updateParams = useCallback((updater: (prev: PostQueryParams) => PostQueryParams) => {
    setParams((prev) => ({
      ...updater(prev),
      nextCursor: undefined,
      prevCursor: undefined,
    }));
  }, []);

  /**
   * 정렬 변경
   */
  const handleSortChange = useCallback(
    (sortField: Sort) => {
      updateParams((prev) => ({
        ...prev,
        sort: sortField,
        order: prev.sort === sortField && prev.order === 'asc' ? 'desc' : 'asc',
      }));
    },
    [updateParams]
  );

  /**
   * 카테고리 필터 변경
   */
  const handleCategoryChange = useCallback(
    (category: PostCategory | '') => {
      updateParams((prev) => ({
        ...prev,
        category: category || undefined,
      }));
    },
    [updateParams]
  );

  /**
   * 검색 실행
   */
  const handleSearch = useCallback(() => {
    updateParams((prev) => ({
      ...prev,
      search: searchInput.trim() || undefined,
    }));
  }, [searchInput, updateParams]);

  /**
   * 검색 초기화
   */
  const handleSearchReset = useCallback(() => {
    setSearchInput('');
    updateParams((prev) => ({
      ...prev,
      search: undefined,
    }));
  }, [updateParams]);

  /**
   * 다음 페이지
   */
  const handleNextPage = useCallback(
    (nextCursor?: string) => {
      if (nextCursor) {
        setParams((prev) => ({
          ...prev,
          nextCursor,
          prevCursor: undefined,
        }));
      }
    },
    []
  );

  /**
   * 이전 페이지
   */
  const handlePrevPage = useCallback((prevCursor?: string) => {
    if (prevCursor) {
      setParams((prev) => ({
        ...prev,
        prevCursor,
        nextCursor: undefined,
      }));
    }
  }, []);

  /**
   * 행 클릭 시 상세 페이지로 이동
   */
  const handleRowClick = useCallback(
    (postId: string) => {
      router.push(`/posts/${postId}`);
    },
    [router]
  );

  return {
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
  };
};

