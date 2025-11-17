import { z } from 'zod';
import { checkForbiddenWords } from './validation';

/**
 * 게시글 폼 Zod 스키마
 */
export const postFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .max(200, '제목은 200자 이하여야 합니다')
    .refine((val) => !checkForbiddenWords(val), {
      message: '금칙어가 포함되어 있습니다',
    }),
  body: z
    .string()
    .min(1, '내용을 입력해주세요')
    .max(10000, '내용은 10000자 이하여야 합니다')
    .refine((val) => !checkForbiddenWords(val), {
      message: '금칙어가 포함되어 있습니다',
    }),
  category: z.enum(['NOTICE', 'QNA', 'FREE']),
  tags: z.array(z.string()),
});

export type PostFormData = z.infer<typeof postFormSchema>;

