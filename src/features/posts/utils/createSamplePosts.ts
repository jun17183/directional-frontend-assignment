import { createPost } from '../api/posts.api';
import type { PostCategory } from '../api/posts.types';

const categories: PostCategory[] = ['NOTICE', 'QNA', 'FREE'];

const sampleTitles = [
  'Next.js 14 업데이트 내용 정리',
  'React Query 사용법 질문',
  '오늘 점심 뭐 먹을까요?',
  'TypeScript 5.0 새로운 기능',
  'Tailwind CSS vs MUI 비교',
  '프론트엔드 개발자 채용 공고',
  'useState vs useReducer 언제 쓰나요?',
  '개발하다가 막혀서 질문드립니다',
  '주말에 뭐하시나요?',
  'Vercel 배포 시 환경변수 설정',
  'React 18 Concurrent 모드',
  'ESLint 설정 공유합니다',
  '코드 리뷰 부탁드립니다',
  '점심시간 변경 안내',
  'Git 브랜치 전략 추천',
  'VS Code 유용한 익스텐션',
  '신입 개발자 멘토링 신청',
  'API 응답 속도 개선 방법',
  '주간 회의 일정 공지',
  'Jest 테스트 코드 작성법',
];

const sampleBodies = [
  '상세한 내용은 본문을 참고해주세요. 많은 관심 부탁드립니다.',
  '이 부분이 잘 이해가 안 되는데 도움 주실 수 있나요?',
  '여러분의 의견을 듣고 싶습니다!',
  '관련 링크와 예제 코드를 첨부했습니다.',
  '같이 논의하면 좋을 것 같아서 글을 올립니다.',
];

const sampleTags = [
  ['react', 'nextjs'],
  ['typescript', 'javascript'],
  ['css', 'styling'],
  ['backend', 'api'],
  ['git', 'github'],
  ['testing', 'jest'],
  ['performance', 'optimization'],
  ['free-talk'],
];

/**
 * 샘플 게시글 생성
 */
export const createSamplePosts = async (count: number = 25) => {
  const promises = [];
  
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    const title = sampleTitles[i % sampleTitles.length] + ` #${i + 1}`;
    const body = sampleBodies[i % sampleBodies.length];
    const tags = sampleTags[i % sampleTags.length];
    
    promises.push(createPost({ title, body, category, tags }));
    
    // API Rate limit 방지를 위해 약간의 딜레이
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  await Promise.all(promises);
};

