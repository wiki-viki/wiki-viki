//eslint-disable-next-line
import { URL_REGEX } from '@/constants/regex';

export const isValidUrl = (url: string): boolean => {
  return URL_REGEX.test(url);
};
