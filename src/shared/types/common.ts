export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface PaginationParams {
  cursor?: string;
  take?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
}

