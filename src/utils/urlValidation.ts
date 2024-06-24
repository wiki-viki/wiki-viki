//eslint-disable-next-line
const URLREGEX = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;

export const isValidUrl = (url: string): boolean => {
  return URLREGEX.test(url);
};
