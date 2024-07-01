import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CommonButton from '@/components/common/CommonButton';
import dateToString from '@/utils/dateToString';
import { extractFirstImgSrc, roundAttributes } from '@/utils/quillHtmlHandler';
import { type ArticleFormData } from '@/types/apiType';
import { postArticle } from '@/lib/apis/article/articleApi.api';
import ToastSelect from '@/components/common/ToastSelect';
import { OTHER_TYPE_ERROR_TEXT } from '@/constants/otherTypeErrorText';

const ReactQuillWrapper = dynamic(import('@/components/AddBoard/QuillEditor'), {
  ssr: false,
  loading: () => {
    return <p>Loading...</p>;
  },
});

const TITLE_MAX_LEN = 30;

const AddBoard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentLength, setContentLength] = useState({ withSpaces: 0, withoutSpaces: 0 });
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const refineHTMLContent = (initContext: string) => {
    let newContent = '';

    const firstImageSrc = extractFirstImgSrc(initContext);
    newContent = initContext.replace(/cursor: (nesw|nwse)-resize;/g, '');
    newContent = roundAttributes(newContent);

    return { firstImageSrc, newContent };
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const { firstImageSrc, newContent } = refineHTMLContent(content);

    const boardData: ArticleFormData = {
      title,
      content: newContent,
    };

    if (firstImageSrc) {
      boardData.image = firstImageSrc;
    }

    try {
      const response = await postArticle(boardData);
      ToastSelect({
        type: 'check',
        message: '게시물 작성에 성공했습니다!',
      });
      router.push(`/board/${response.id}`);
    } catch (e: unknown) {
      ToastSelect({
        type: 'error',
        message: OTHER_TYPE_ERROR_TEXT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputContent = (
    content: string,
    length: { withSpaces: number; withoutSpaces: number },
  ) => {
    setContent(content);
    setContentLength(length);
  };

  useEffect(() => {
    setIsValid(title.trim().length > 0 && content.trim().length > 0);
  }, [title, content]);

  return (
    <div className="center mt-4 flex-col">
      <main className="md:profile-shadow flex w-full max-w-[1060px] flex-col gap-3 rounded-10 md:gap-5 md:px-[30px] md:py-[40px]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg-semibold md:text-xl-semibold lg:text-2xl-semibold">
            게시물 등록하기
          </h2>
          <CommonButton
            isActive={isValid && !isLoading}
            disabled={!isValid || isLoading}
            onClick={handleSubmit}
            variant="primary"
          >
            {isLoading ? '등록 중...' : '등록하기'}
          </CommonButton>
        </div>
        <span className="text-xs-regular text-gray-400 md:text-lg-regular">
          등록일 {dateToString(new Date())}
        </span>
        <div>
          <div className="mt-1 border-t" />
          <div className="flex items-center justify-between gap-2">
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className="flex-1 rounded-sm py-3 text-lg-medium outline-none md:text-xl-medium"
              placeholder="제목을 입력해주세요"
              maxLength={TITLE_MAX_LEN}
            />
            <span className="text-xs-medium md:text-md-medium">
              {title.length}/<span className="text-primary-green-200">{TITLE_MAX_LEN}</span>
            </span>
          </div>
          <div className="border-t" />
        </div>
        <span className="text-md-medium md:text-lg-medium">
          공백포함 : 총<span className="text-primary-green-200"> {contentLength.withSpaces}</span>자
          | 공백제외: 총
          <span className="text-primary-green-200"> {contentLength.withoutSpaces}</span>자
        </span>
        <ReactQuillWrapper setContent={handleInputContent} content={content} />
      </main>
      <Link href="/boards" rel="preload">
        <CommonButton variant="secondary" className="my-8">
          목록으로
        </CommonButton>
      </Link>
    </div>
  );
};

export default AddBoard;
