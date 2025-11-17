/**
 * 게시글 카테고리
 */
export type PostCategory = 'NOTICE' | 'QNA' | 'FREE';

/**
 * 정렬 기준
 */
export type Sort = 'title' | 'createdAt';

/**
 * 정렬 순서
 */
export type Order = 'asc' | 'desc';

/**
 * 게시글 인터페이스
 */
export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
  createdAt: string;
}

/**
 * 게시글 생성 DTO
 */
export interface CreatePostDto {
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
}

/**
 * 게시글 수정 DTO (최소 1개 필드 필요)
 */
export interface UpdatePostDto {
  title?: string;
  body?: string;
  category?: PostCategory;
  tags?: string[];
}

/**
 * 게시글 조회 쿼리 파라미터
 */
export interface PostQueryParams {
  limit?: number;        // 페이지 크기 (1~100), default: 10
  prevCursor?: string;   // 이전 페이지 커서
  nextCursor?: string;   // 다음 페이지 커서
  sort?: Sort;           // 정렬 필드
  order?: Order;         // 정렬 방향
  category?: PostCategory;
  from?: string;         // 시작 날짜 (ISO 8601)
  to?: string;           // 종료 날짜 (ISO 8601)
  search?: string;       // 제목/본문 검색어
}

/**
 * 게시글 목록 응답
 */
export interface PostsResponse {
  items: Post[];
  nextCursor?: string;
  prevCursor?: string;
}

/**
 * 게시글 삭제 응답
 */
export interface DeletePostResponse {
  ok: boolean;
  deleted: number;
}

