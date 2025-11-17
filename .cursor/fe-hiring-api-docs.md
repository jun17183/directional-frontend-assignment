# FE Hiring REST API Documentation

## Posts API

### GET /posts

양방향 커서 기반 페이지네이션(prevCursor/nextCursor)을 지원합니다. prev/next를 동시에 전달할 수 없습니다.

#### Parameters

| Name | Type | Location | Description |
|------|------|----------|-------------|
| `limit` | integer | query | 페이지 크기 (1~100)<br/>**Default:** 10 |
| `prevCursor` | string | query | 이전 페이지용 커서(opaque). 이전 응답의 prevCursor를 그대로 전달. nextCursor와 동시 사용 불가. |
| `nextCursor` | string | query | 다음 페이지용 커서(opaque). 이전 응답의 nextCursor를 그대로 전달. prevCursor와 동시 사용 불가. |
| `sort` | string | query | 정렬 필드<br/>**Available values:** `createdAt`, `title` |
| `order` | string | query | 정렬 방향<br/>**Available values:** `asc`, `desc` |
| `category` | string | query | **Available values:** `NOTICE`, `QNA`, `FREE` |
| `from` | string(date-time) | query | 시작 날짜 |
| `to` | string(date-time) | query | 종료 날짜 |
| `search` | string | query | 제목/본문 검색어 (공백으로 여러 단어 입력 시 AND 매칭) |

#### Response (200)

**Media type:** `application/json`

```json
{
  "items": [
    {
      "id": "p_abc123",
      "userId": "u_1",
      "title": "Sample Post #1",
      "body": "Hello world",
      "category": "NOTICE",
      "tags": ["react", "ts"],
      "createdAt": "2025-11-16T18:24:33.370Z"
    }
  ],
  "nextCursor": "eyJzIjoidGl0bGUiLCJvIjoiYXNjIiwidiI6Iu2VnO2VgCIsImlkIjoicF83ODkifQ",
  "prevCursor": "eyJzIjoidGl0bGUiLCJvIjoiYXNjIiwidiI6Iu2VnO2VgCIsImlkIjoicF83ODkifQ"
}
```

---

### POST /posts

새로운 포스트를 생성합니다.

#### Request Body

**Media type:** `application/json`

```json
{
  "title": "string",
  "body": "string",
  "category": "NOTICE",
  "tags": ["string"]
}
```

#### Response (201)

**Description:** 생성됨

**Media type:** `application/json`

```json
{
  "id": "p_abc123",
  "userId": "u_1",
  "title": "Sample Post #1",
  "body": "Hello world",
  "category": "NOTICE",
  "tags": ["react", "ts"],
  "createdAt": "2025-11-16T18:25:14.568Z"
}
```

---

### DELETE /posts/{id}

JWT 소유자의 모든 포스트를 삭제합니다.

#### Parameters

No parameters

#### Response (200)

**Description:** 삭제된 개수 반환

**Media type:** `application/json`

```json
{
  "ok": true,
  "deleted": 1
}
```

#### Response (401)

**Description:** Unauthorized

---

### PATCH /posts/{id}

필요한 필드만 부분 업데이트합니다. 최소 1개 필드가 필요합니다.

#### Parameters

| Name | Type | Location | Description |
|------|------|----------|-------------|
| `id` | string | path | **Required** |

#### Request Body

**Media type:** `application/json`

```json
{
  "title": "string",
  "body": "string",
  "category": "NOTICE",
  "tags": ["string"]
}
```

---

## Mock Data APIs

### GET /mock/posts

고정 Mock 데이터 N건 반환 (기본 300, 최대 500)

서버 시작 시 생성된 고정 500개 데이터 중 앞에서부터 `count`개를 반환합니다. 항상 동일한 데이터셋에서 slice 되므로 요청마다 결과가 일관됩니다.

#### Parameters

| Name | Type | Location | Description |
|------|------|----------|-------------|
| `count` | integer | query | 반환할 항목 수 (고정 500개 중 앞에서부터 slice)<br/>**Default:** 300<br/>**Maximum:** 500<br/>**Example:** 5 |

#### Response (200)

**Description:** 목업 목록

**Media type:** `application/json`

**예시: count=3**

```json
{
  "items": [
    {
      "id": "m_0001",
      "userId": "u_mock_1",
      "title": "샘플 포스트 #1",
      "body": "이것은 고정된 테스트용 포스트 본문입니다. (1)번째 게시글.",
      "category": "NOTICE",
      "tags": ["react"],
      "createdAt": "2025-10-22T11:40:00.000Z"
    },
    {
      "id": "m_0002",
      "userId": "u_mock_2",
      "title": "샘플 포스트 #2",
      "body": "이것은 고정된 테스트용 포스트 본문입니다. (2)번째 게시글.",
      "category": "QNA",
      "tags": ["typescript"],
      "createdAt": "2025-10-22T10:40:00.000Z"
    },
    {
      "id": "m_0003",
      "userId": "u_mock_3",
      "title": "샘플 포스트 #3",
      "body": "이것은 고정된 테스트용 포스트 본문입니다. (3)번째 게시글.",
      "category": "FREE",
      "tags": ["nextjs"],
      "createdAt": "2025-10-22T09:40:00.000Z"
    }
  ],
  "count": 3
}
```

---

### GET /mock/coffee-consumption

멀티라인 차트용 팀별 커피 소비/버그/생산성 목업

#### Parameters

No parameters

#### Response (200)

**Description:** 팀별 데이터

**Media type:** `application/json`

```json
{
  "teams": [
    {
      "team": "Frontend",
      "series": [
        {
          "cups": 1,
          "bugs": 12,
          "productivity": 60
        },
        {
          "cups": 2,
          "bugs": 8,
          "productivity": 72
        },
        {
          "cups": 3,
          "bugs": 6,
          "productivity": 85
        },
        {
          "cups": 4,
          "bugs": 7,
          "productivity": 83
        },
        {
          "cups": 5,
          "bugs": 9,
          "productivity": 78
        }
      ]
    },
    {
      "team": "Backend",
      "series": [
        {
          "cups": 1,
          "bugs": 14,
          "productivity": 58
        },
        {
          "cups": 2,
          "bugs": 10,
          "productivity": 70
        },
        {
          "cups": 3,
          "bugs": 7,
          "productivity": 82
        },
        {
          "cups": 4,
          "bugs": 8,
          "productivity": 80
        },
        {
          "cups": 5,
          "bugs": 11,
          "productivity": 75
        }
      ]
    },
    {
      "team": "AI",
      "series": [
        {
          "cups": 1,
          "bugs": 13,
          "productivity": 62
        },
        {
          "cups": 2,
          "bugs": 9,
          "productivity": 74
        },
        {
          "cups": 3,
          "bugs": 6,
          "productivity": 88
        },
        {
          "cups": 4,
          "bugs": 7,
          "productivity": 86
        },
        {
          "cups": 5,
          "bugs": 10,
          "productivity": 80
        }
      ]
    }
  ]
}
```

---

### GET /mock/weekly-mood-trend

스택형 바/면적 차트용 주간 무드 트렌드 목업

#### Parameters

No parameters

#### Response (200)

**Description:** 주간 무드 배열

**Media type:** `application/json`

```json
[
  {
    "week": "2024-11-25",
    "happy": 68,
    "tired": 21,
    "stressed": 11
  },
  {
    "week": "2024-12-02",
    "happy": 61,
    "tired": 25,
    "stressed": 14
  },
  {
    "week": "2024-12-09",
    "happy": 72,
    "tired": 18,
    "stressed": 10
  },
  {
    "week": "2024-12-16",
    "happy": 58,
    "tired": 30,
    "stressed": 12
  },
  {
    "week": "2024-12-23",
    "happy": 80,
    "tired": 15,
    "stressed": 5
  }
]
```

---

### GET /mock/top-coffee-brands

바/도넛 차트용 인기 커피 브랜드 분포 목업

#### Parameters

No parameters

#### Response (200)

**Description:** 브랜드/인기도 배열

**Media type:** `application/json`

```json
[
  {
    "brand": "스타벅스",
    "popularity": 40
  },
  {
    "brand": "컴포즈커피",
    "popularity": 25
  },
  {
    "brand": "커피빈",
    "popularity": 20
  },
  {
    "brand": "바나프레소",
    "popularity": 10
  },
  {
    "brand": "기타",
    "popularity": 5
  }
]
```

---

## Data Models

### Post Object

```typescript
{
  id: string;          // 포스트 ID (예: "p_abc123")
  userId: string;      // 사용자 ID (예: "u_1")
  title: string;       // 제목
  body: string;        // 본문
  category: "NOTICE" | "QNA" | "FREE";  // 카테고리
  tags: string[];      // 태그 배열
  createdAt: string;   // ISO 8601 날짜 형식
}
```

### Category Types

- `NOTICE`: 공지사항
- `QNA`: 질문과 답변
- `FREE`: 자유 게시판
