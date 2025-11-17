/**
 * 금칙어 목록
 */
const FORBIDDEN_WORDS = ['캄보디아', '프놈펜', '불법체류', '텔레그램'] as const;

/**
 * 금칙어 체크 함수
 */
export const checkForbiddenWords = (text: string): boolean => {
  return FORBIDDEN_WORDS.some((word) => text.includes(word));
};

