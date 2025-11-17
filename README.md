# Directional 프론트엔드 과제

Next.js 기반의 게시판 및 데이터 시각화 대시보드 애플리케이션
https://directional-frontend-assignment.vercel.app/

## 기술 스택

- **Next.js 16** (Pages Router) - 라우팅 및 SSR
- **TypeScript** - 타입 안정성
- **React Query** - 서버 상태 관리 및 캐싱
- **MUI** - UI 컴포넌트 라이브러리
- **Recharts** - 데이터 시각화
- **React Hook Form + Zod** - 폼 관리 및 검증

## 프로젝트 구조

```
src/
├── features/          # 기능별 모듈
│   ├── posts/        # 게시판 기능
│   ├── charts/       # 차트 기능
│   └── auth/         # 인증 기능
├── pages/            # Next.js 페이지
├── shared/           # 공통 모듈
│   ├── components/   # 재사용 컴포넌트
│   ├── lib/          # 유틸리티 (axios, react-query)
│   └── styles/       # 전역 스타일
```

Feature-based 구조로 관심사 분리를 했습니다. 각 feature는 `api`, `hooks`, `components`로 나뉘어 책임이 명확합니다.

## 주요 기능

### 게시판
- CRUD 작업 (생성, 조회, 수정, 삭제)
- 커서 기반 페이지네이션
- 검색 및 카테고리 필터링
- 금칙어 검증 (클라이언트 사이드)

커서 기반 페이지네이션은 대용량 데이터에서 offset보다 효율적입니다. `usePostListFilters` 훅으로 필터/정렬 상태를 관리해 컴포넌트 로직을 단순화했습니다.

### 데이터 시각화
- 커피 브랜드 인기도 (바 차트, 도넛 차트)
- 주간 무드 트렌드 (스택형 바/면적 차트)
- 팀별 커피 소비와 생산성 (멀티라인, 이중 Y축)

각 차트는 독립 컴포넌트로 분리했고, React Query로 데이터를 캐싱해 불필요한 재요청을 줄였습니다.

## 코드 예시

### React Query 사용

```typescript
// features/posts/hooks/usePosts.queries.ts
export const usePosts = (params: PostQueryParams = {}) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
  });
};
```

쿼리 키에 파라미터를 포함해 필터 변경 시 자동으로 재요청됩니다.

### 폼 검증

```typescript
// features/posts/utils/postFormSchema.ts
export const postFormSchema = z.object({
  title: z.string().min(1).max(200)
    .refine((val) => !checkForbiddenWords(val), {
      message: '금칙어가 포함되어 있습니다',
    }),
  // ...
});
```

Zod 스키마로 타입 안전한 검증을 하고, 금칙어 체크는 `refine`으로 추가했습니다.

### Axios 인터셉터

```typescript
// shared/lib/axios.ts
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

모든 요청에 토큰을 자동으로 첨부하고, 401 응답 시 로그인 페이지로 리다이렉트합니다.

## API

API 엔드포인트는 [Swagger 문서](https://fe-hiring-rest-api.vercel.app/docs)를 참고
