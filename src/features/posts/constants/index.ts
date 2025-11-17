import type { PostCategory } from '../api/posts.types';

/**
 * 카테고리 라벨
 */
export const CATEGORY_LABELS: Record<PostCategory, string> = {
  NOTICE: '공지사항',
  QNA: '질문답변',
  FREE: '자유게시판',
} as const;

/**
 * 카테고리 색상
 */
export const CATEGORY_COLORS: Record<PostCategory, 'error' | 'success' | 'default'> = {
  NOTICE: 'error',      // 빨강
  QNA: 'success',       // 초록
  FREE: 'default',      // 회색
} as const;

/**
 * 카테고리 옵션 (Select 등에서 사용)
 */
export const CATEGORY_OPTIONS: { value: PostCategory; label: string }[] = [
  { value: 'NOTICE', label: CATEGORY_LABELS.NOTICE },
  { value: 'QNA', label: CATEGORY_LABELS.QNA },
  { value: 'FREE', label: CATEGORY_LABELS.FREE },
] as const;

/**
 * 기본 페이지 크기
 */
export const DEFAULT_PAGE_LIMIT = 10;

/**
 * 기본 정렬 설정
 */
export const DEFAULT_SORT = {
  sort: 'createdAt' as const,
  order: 'desc' as const,
};

