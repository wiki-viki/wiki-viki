export const searchRegex = (keyword: string, target: string) => {
  const regex = new RegExp(keyword.replace(/\s/g, ''), 'i');
  return regex.test(target.replace(/\s/g, ''));
};

// 공백을 제거하고, 'i' 옵션을 사용해서 대소문자를 구분하지 않도록 만들었어요!
