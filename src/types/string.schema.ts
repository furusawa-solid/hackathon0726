import { z } from 'zod';
import { onlyWhiteSpaceRegex } from '../utils/string';

export const nonWhitespaceString = z
  .string()
  .min(1, '文字を入力してください。')
  .refine(
    (value) => !onlyWhiteSpaceRegex.test(value),
    '空白を指定できません。',
  );
