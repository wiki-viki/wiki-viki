// 첫번째 이미지 가져오는 함수
export const extractFirstImgSrc = (content: string) => {
  const regexImgSrc = /<img[^>]+src="([^">]+)"/;
  const matchImgSrc = content.match(regexImgSrc);
  return matchImgSrc && matchImgSrc.length > 1 ? matchImgSrc[1] : '';
};

// 이미지 사이즈 소수점 제거
export const roundAttributes = (content: string) => {
  return content.replace(/(width|height)="([^"]+)"/g, (match, p1, p2) => {
    const roundedValue = Math.round(parseFloat(p2));
    return `${p1}="${roundedValue}"`;
  });
};

// Quill 에디터로 작성된 내용 정제
export const refineHTMLContent = (initContext: string) => {
  let newContent = '';

  const firstImageSrc = extractFirstImgSrc(initContext);
  newContent = initContext.replace(/cursor: (nesw|nwse)-resize;/g, '');
  newContent = roundAttributes(newContent);

  return { firstImageSrc, newContent };
};
