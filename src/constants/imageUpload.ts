export const IMAGE_VALIDATION = {
  NAME_REGEX: /^[a-zA-Z0-9_\-.]+$/,
  EXTENSION_REGEX: /\.(png|jpg|jpeg)$/,
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
};

export const IMAGE_ERROR_MESSAGE = {
  INVALID_NAME: '이미지 파일 이름은 영어, 숫자, 밑줄(_), 하이픈(-) 및 점(.)만 포함해야 합니다',
  INVALID_EXTENSION: '파일 확장자는 .png, .jpg, .jpeg 형식이어야 합니다.',
  INVALID_SIZE: '파일 크기는 5MB 이하이어야 합니다.',
};
