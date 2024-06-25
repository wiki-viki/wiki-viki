import { URL_REGEX } from '@/constants/regex';

export const urlRegex = (url: string): boolean => {
  return URL_REGEX.test(url);
};
