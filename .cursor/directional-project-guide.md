# Directional 프론트엔드 과제 개발 가이드

## 📦 1. 프로젝트 초기 설정

### 1-1. Next.js 프로젝트 생성

```bash
# TypeScript 템플릿으로 생성
pnpm create next-app@latest directional-frontend-assignment --typescript --no-eslint

# 설치 옵션 선택
✔ Would you like to use ESLint? … No
✔ Would you like to use Tailwind CSS? … No
✔ Would you like to use `src/` directory? … Yes
✔ Would you like to use App Router? … No (Pages Router 사용)
✔ Would you like to customize the default import alias (@/*)? … Yes
✔ What import alias would you like configured? … @/*

# 프로젝트 디렉토리로 이동
cd directional-frontend-assignment
```

### 1-2. 필수 라이브러리 설치

```bash
# 핵심 라이브러리
pnpm add @tanstack/react-query axios

# MUI
pnpm add @mui/material @emotion/react @emotion/styled @mui/icons-material

# Styled Components (최소 사용)
pnpm add styled-components
pnpm add -D @types/styled-components

# 차트 라이브러리
pnpm add recharts

# 개발 도구
pnpm add -D @tanstack/react-query-devtools
```

### 1-3. 추가 유틸리티 (선택사항)

```bash
# 날짜 포맷팅
pnpm add date-fns

# Form 관리 (게시글 작성 폼)
pnpm add react-hook-form zod @hookform/resolvers

# Toast 알림
pnpm add react-hot-toast
```

## 📁 2. 폴더 구조 생성

```bash
# src 디렉토리 구조 생성
mkdir -p src/features/posts/{api,hooks,components}
mkdir -p src/features/charts/{api,hooks,components}
mkdir -p src/features/auth/{api,hooks}
mkdir -p src/shared/{components/ui,components/layout,lib,styles,types}
```

### 최종 폴더 구조

```
src/
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx (나중에 추가)
│   ├── index.tsx
│   ├── posts/
│   │   ├── [id].tsx
│   │   └── new.tsx
│   └── charts/
│       └── index.tsx
├── features/
│   ├── posts/
│   │   ├── api/
│   │   │   ├── posts.api.ts
│   │   │   └── posts.types.ts
│   │   ├── hooks/
│   │   │   ├── usePosts.queries.ts
│   │   │   └── usePosts.mutations.ts
│   │   └── components/
│   │       ├── PostList.tsx
│   │       ├── PostCard.tsx
│   │       ├── PostForm.tsx
│   │       └── PostFilter.tsx
│   ├── charts/
│   │   ├── api/
│   │   │   ├── charts.api.ts
│   │   │   └── charts.types.ts
│   │   ├── hooks/
│   │   │   └── useCharts.queries.ts
│   │   └── components/
│   │       ├── CoffeeBrandChart.tsx
│   │       ├── MoodTrendChart.tsx
│   │       └── ConsumptionChart.tsx
│   └── auth/
│       ├── api/
│       │   └── auth.api.ts
│       └── hooks/
│           └── useAuth.ts
└── shared/
    ├── components/
    │   ├── ui/
    │   │   └── (MUI 커스텀 컴포넌트)
    │   └── layout/
    │       ├── Layout.tsx
    │       └── Sidebar.tsx
    ├── lib/
    │   ├── axios.ts
    │   └── react-query.ts
    ├── styles/
    │   └── (필요시 전역 스타일)
    └── types/
        └── common.ts
```

## ⚙️ 3. 기본 설정 파일 생성

### 3-1. `src/pages/_app.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 3-2. `src/shared/lib/axios.ts`

```typescript
import axios from 'axios';

const API_BASE_URL = 'https://fe-hiring-rest-api.vercel.app';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
```

### 3-3. `src/shared/lib/react-query.ts`

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

## 🚀 4. 개발 작업 단계

### Phase 1: 인증 구현

**목표**: 로그인 기능 구현 및 토큰 관리

#### 작업 내용:
1. **API 함수 작성**
   - `src/features/auth/api/auth.api.ts`
   - `/auth/login` 엔드포인트 연동

2. **React Query Hook 작성**
   - `src/features/auth/hooks/useAuth.ts`
   - `useMutation`으로 로그인 처리

3. **간단한 로그인 UI**
   - MUI TextField, Button 사용
   - 로그인 성공 시 토큰 저장

#### 체크리스트:
- [ ] Swagger에서 `/auth/login` API 스펙 확인
- [ ] auth.api.ts 작성
- [ ] useAuth hook 작성
- [ ] 로그인 폼 UI 구현
- [ ] 토큰 localStorage 저장 확인
- [ ] axios interceptor 테스트

---

### Phase 2: 게시판 CRUD

**목표**: 게시글 목록 조회, 작성, 수정, 삭제 구현

#### 작업 내용:

**2-1. API 레이어**
- `src/features/posts/api/posts.types.ts`: 타입 정의
- `src/features/posts/api/posts.api.ts`: CRUD API 함수

```typescript
// posts.types.ts 예시
export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: 'NOTICE' | 'QNA' | 'FREE';
  tags: string[];
  createdAt: string;
}

export interface CreatePostDto {
  title: string;
  body: string;
  category: string;
  tags: string[];
}

export interface PostQueryParams {
  cursor?: string;
  take?: number;
  search?: string;
  category?: string;
  sortBy?: 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
```

**2-2. React Query Hooks**
- `usePosts.queries.ts`: 조회 hooks
  - `usePosts()`: 목록 조회
  - `usePost(id)`: 단일 조회
- `usePosts.mutations.ts`: 변경 hooks
  - `useCreatePost()`
  - `useUpdatePost()`
  - `useDeletePost()`

**2-3. UI 컴포넌트**
- `PostList.tsx`: 목록 + 필터/검색
- `PostCard.tsx`: 개별 게시글 카드
- `PostForm.tsx`: 작성/수정 폼
- `PostFilter.tsx`: 카테고리 필터, 검색바

**2-4. 페이지**
- `pages/index.tsx`: 게시판 메인 (목록)
- `pages/posts/[id].tsx`: 게시글 상세
- `pages/posts/new.tsx`: 게시글 작성

#### 체크리스트:
- [ ] Swagger에서 `/posts` API 스펙 확인
- [ ] posts.types.ts 타입 정의
- [ ] posts.api.ts CRUD 함수 작성
- [ ] usePosts.queries.ts 작성
- [ ] usePosts.mutations.ts 작성
- [ ] PostList 컴포넌트 (MUI Card, Pagination)
- [ ] PostForm 컴포넌트 (react-hook-form + zod)
- [ ] 금칙어 필터 구현
- [ ] 검색 기능 구현
- [ ] 카테고리 필터 구현
- [ ] 정렬 기능 구현
- [ ] 커서 기반 페이지네이션 구현

---

### Phase 3: 데이터 시각화

**목표**: 3개 엔드포인트 차트 구현

#### 작업 내용:

**3-1. API 레이어**
- `src/features/charts/api/charts.types.ts`
- `src/features/charts/api/charts.api.ts`

**3-2. React Query Hooks**
- `useCharts.queries.ts`
  - `useCoffeeBrands()`
  - `useMoodTrend()`
  - `useCoffeeConsumption()`

**3-3. 차트 컴포넌트**

**CoffeeBrandChart.tsx**
- 바 차트 + 도넛 차트
- Recharts 사용

```typescript
import { BarChart, Bar, PieChart, Pie } from 'recharts';

// 1. 바 차트
<BarChart data={data}>
  <Bar dataKey="sales" />
</BarChart>

// 2. 도넛 차트
<PieChart>
  <Pie data={data} innerRadius={60} outerRadius={80} />
</PieChart>
```

**MoodTrendChart.tsx**
- 스택형 바 차트 + 스택형 면적 차트
- Y축: 백분율(%)

```typescript
import { BarChart, Bar, AreaChart, Area } from 'recharts';

// 스택형 바
<BarChart>
  <Bar dataKey="happy" stackId="a" />
  <Bar dataKey="tired" stackId="a" />
  <Bar dataKey="stressed" stackId="a" />
</BarChart>

// 스택형 면적
<AreaChart>
  <Area dataKey="happy" stackId="1" />
  <Area dataKey="tired" stackId="1" />
  <Area dataKey="stressed" stackId="1" />
</AreaChart>
```

**ConsumptionChart.tsx** (가장 복잡)
- 멀티라인 차트
- 이중 Y축 (버그/생산성)
- 팀별 색상 통일
- 실선(버그) vs 점선(생산성)
- 마커 (원형/사각형)

```typescript
import { LineChart, Line, YAxis } from 'recharts';

<LineChart>
  <YAxis yAxisId="left" /> {/* 버그 */}
  <YAxis yAxisId="right" orientation="right" /> {/* 생산성 */}
  
  {/* Frontend 팀 - 파란색 */}
  <Line yAxisId="left" dataKey="Frontend_bugs" 
        stroke="#8884d8" dot={{ r: 4 }} />
  <Line yAxisId="right" dataKey="Frontend_productivity" 
        stroke="#8884d8" strokeDasharray="5 5" 
        dot={{ shape: 'square' }} />
  
  {/* Backend 팀 - 초록색 */}
  <Line yAxisId="left" dataKey="Backend_bugs" 
        stroke="#82ca9d" dot={{ r: 4 }} />
  <Line yAxisId="right" dataKey="Backend_productivity" 
        stroke="#82ca9d" strokeDasharray="5 5" 
        dot={{ shape: 'square' }} />
</LineChart>
```

**3-4. 페이지**
- `pages/charts/index.tsx`: 차트 대시보드

#### 체크리스트:
- [ ] Swagger에서 `/mock/*` API 스펙 확인
- [ ] charts.types.ts 타입 정의
- [ ] charts.api.ts 함수 작성
- [ ] useCharts.queries.ts 작성
- [ ] CoffeeBrandChart: 바 차트 구현
- [ ] CoffeeBrandChart: 도넛 차트 구현
- [ ] MoodTrendChart: 스택형 바 차트 구현
- [ ] MoodTrendChart: 스택형 면적 차트 구현
- [ ] ConsumptionChart: 기본 구조 구현
- [ ] ConsumptionChart: 이중 Y축 설정
- [ ] ConsumptionChart: 팀별 색상/선 스타일 적용
- [ ] ConsumptionChart: 마커 설정
- [ ] ConsumptionChart: 커스텀 툴팁 구현

---

### Phase 4: 레이아웃 & UX 개선

**목표**: 사이드바, 전체 레이아웃, 반응형 구현

#### 작업 내용:

**4-1. 레이아웃 컴포넌트**
- `src/shared/components/layout/Layout.tsx`
- `src/shared/components/layout/Sidebar.tsx`

```typescript
// Layout.tsx
import { Box, Drawer } from '@mui/material';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent">
        <Sidebar />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
```

**4-2. _app.tsx에 Layout 적용**

```typescript
// pages/_app.tsx
import Layout from '@/shared/components/layout/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

**4-3. UX 개선**
- 로딩 스피너 (MUI CircularProgress)
- 에러 메시지 (react-hot-toast)
- 빈 상태 UI
- 낙관적 업데이트 (게시글 삭제 시)

#### 체크리스트:
- [ ] Layout 컴포넌트 구현
- [ ] Sidebar 네비게이션 구현
- [ ] 로딩 상태 UI
- [ ] 에러 처리 UI
- [ ] Toast 알림 연동
- [ ] 반응형 확인 (모바일, 태블릿, 데스크톱)

---

### Phase 5: 마무리 & 배포

#### 작업 내용:

**5-1. 코드 정리**
- [ ] 사용하지 않는 import 제거
- [ ] 콘솔 로그 제거
- [ ] 타입 any 제거
- [ ] 주석 정리

**5-2. README.md 작성**

```markdown
# Directional 프론트엔드 과제

## 프로젝트 실행 방법
\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## 사용 기술 스택
- Next.js 14 (Pages Router)
- TypeScript
- React Query (TanStack Query)
- MUI (Material-UI)
- Recharts
- Axios

## 주요 구현 기능
### 1. 게시판
- CRUD 기능
- 커서 기반 페이지네이션
- 검색 및 필터링
- 금칙어 필터

### 2. 데이터 시각화
- 바 차트 & 도넛 차트
- 스택형 차트
- 멀티라인 차트 (이중 Y축)

## 배포 링크
https://your-deployment-url.vercel.app
```

**5-3. Vercel 배포**
```bash
# Vercel CLI 설치
pnpm add -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

**5-4. 환경변수 설정 (필요시)**
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://fe-hiring-rest-api.vercel.app
```

#### 최종 체크리스트:
- [ ] 모든 기능 동작 확인
- [ ] 에러 없이 빌드 성공 (`pnpm build`)
- [ ] README.md 작성
- [ ] GitHub Repository 생성 및 Push
- [ ] Vercel 배포
- [ ] 배포 URL 동작 확인
- [ ] 채용 담당자 이메일 발송

---

## 📝 개발 팁

### 1. React Query 패턴

```typescript
// queries
export const usePosts = (params: PostQueryParams) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => fetchPosts(params),
    enabled: !!params, // 조건부 실행
  });
};

// mutations
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 캐시 무효화로 자동 리페칭
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('게시글이 작성되었습니다');
    },
    onError: (error) => {
      toast.error('작성 실패');
    },
  });
};
```

### 2. 금칙어 체크

```typescript
// features/posts/utils/validation.ts
const FORBIDDEN_WORDS = ['캄보디아', '프놈펜', '불법체류', '텔레그램'];

export const checkForbiddenWords = (text: string): boolean => {
  return FORBIDDEN_WORDS.some(word => text.includes(word));
};

export const validatePost = (title: string, body: string) => {
  if (checkForbiddenWords(title) || checkForbiddenWords(body)) {
    throw new Error('금칙어가 포함되어 있습니다');
  }
};
```

### 3. MUI 커스텀 테마

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // 대문자 변환 방지
        },
      },
    },
  },
});
```

### 4. 에러 처리

```typescript
const { data, error, isLoading } = usePosts(params);

if (isLoading) return <CircularProgress />;
if (error) return <Alert severity="error">에러 발생</Alert>;
if (!data) return <Box>데이터 없음</Box>;

return <PostList posts={data} />;
```

---

## 🎯 우선순위

**필수 (Must Have)**
- 게시판 CRUD
- 검색, 필터, 정렬
- 커서 기반 페이지네이션
- 금칙어 필터
- 3가지 차트 모두 구현
- 멀티라인 차트 상세 요구사항 (이중 Y축, 마커, 툴팁)

**권장 (Should Have)**
- 로딩/에러 UI
- Toast 알림
- 반응형 레이아웃

**선택 (Nice to Have)**
- 다크모드
- 애니메이션
- 게시글 상세 페이지 풍부한 UI
- 무한 스크롤 (커서 페이지네이션 대신)

---

## 📚 참고 문서

- [Swagger API 문서](https://fe-hiring-rest-api.vercel.app/docs)
- [React Query 공식 문서](https://tanstack.com/query/latest)
- [MUI 공식 문서](https://mui.com)
- [Recharts 공식 문서](https://recharts.org)
- [Next.js Pages Router](https://nextjs.org/docs/pages)

---

## 🚨 주의사항

1. **커서 기반 페이지네이션**: offset이 아닌 cursor 사용
2. **금칙어 클라이언트 검증**: API 호출 전 검증
3. **멀티라인 차트**: 요구사항 정확히 구현 (마커, 색상, 점선)
4. **타입 안정성**: any 사용 지양
5. **에러 처리**: 모든 API 호출에 에러 처리
