import { URL_VAILDATION } from '@/constants/regex';

export const urlVaildation = (url: string): boolean => {
  return URL_VAILDATION.test(url);
};
