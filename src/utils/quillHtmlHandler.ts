export const extractFirstImgSrc = (content: string) => {
  const regexImgSrc = /<img[^>]+src="([^">]+)"/;
  const matchImgSrc = content.match(regexImgSrc);
  return matchImgSrc && matchImgSrc.length > 1 ? matchImgSrc[1] : '';
};

export const roundAttributes = (content: string) => {
  return content.replace(/(width|height)="([^"]+)"/g, (match, p1, p2) => {
    const roundedValue = Math.round(parseFloat(p2));
    return `${p1}="${roundedValue}"`;
  });
};
