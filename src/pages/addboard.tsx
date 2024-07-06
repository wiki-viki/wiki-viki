import React, { useState, useEffect } from 'react';
import { Zoom } from 'react-toastify';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AxiosError } from 'axios';
import CommonButton from '@/components/common/CommonButton';
import dateToString from '@/utils/dateToString';
import { refineHTMLContent } from '@/utils/quillHtmlHandler';
import { type ArticleFormData } from '@/types/apiType';
import { postArticle } from '@/lib/apis/article/articleApi.api';
import ToastSelect from '@/components/common/ToastSelect';
import { OTHER_TYPE_ERROR_TEXT } from '@/constants/otherTypeErrorText';
import { useAuthStore } from '@/store/userAuthStore';
import { useStore } from '@/store/useStore';
import BoardInfoForm from '@/components/AddBoard/BoardInfoForm';
import 'react-toastify/dist/ReactToastify.css';
import MetaTag from '@/components/common/MetaTag';
import OpenGraphTag from '@/components/common/MetaTag/OpenGraphTag';

const ReactQuillWrapper = dynamic(import('@/components/AddBoard/QuillEditor'), {
  ssr: false,
  loading: () => {
    return <p>Loading...</p>;
  },
});

const StyledToastContainer = dynamic(
  import('@/styles/ToastStyle').then((mod) => {
    return mod.StyledToastContainer;
  }),
  {
    ssr: false,
    loading: () => {
      return <p>Loading...</p>;
    },
  },
);

const AddBoard = () => {
  const user = useStore(useAuthStore, (state) => {
    return state.user;
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentLength, setContentLength] = useState({ withSpaces: 0, withoutSpaces: 0 });
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const isButtonActive = isValid && !isLoading;
  const isButtonDisabled = !isValid || isLoading;

  // 게시물 작성하기
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
        message: '게시물이 작성되었습니다',
        onClose: () => {
          router.push(`/board/${response.id}`);
        },
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        ToastSelect({ type: 'error', message: error.response?.data.message });
      } else {
        ToastSelect({ type: 'error', message: OTHER_TYPE_ERROR_TEXT });
      }
      setIsLoading(false);
    }
  };

  // 게시물 내용 입력
  const handleInputContent = (
    content: string,
    length: { withSpaces: number; withoutSpaces: number },
  ) => {
    setContent(content);
    setContentLength(length);
  };

  // 게시물 유효성 검사
  useEffect(() => {
    setIsValid(title.trim().length > 0 && content.trim().length > 0);
  }, [title, content]);

  return (
    <>
      <MetaTag title="게시물 등록" description="게시물 등록하기 페이지" />
      <OpenGraphTag title="게시물 등록" description="게시물 등록하기 페이지" />
      <div className="center mt-4 flex-col">
        {isValid && createPortal(<StyledToastContainer transition={Zoom} />, document.body)}
        <main className="md:profile-shadow flex w-full max-w-[1060px] flex-col gap-3 rounded-10 md:gap-5 md:px-[30px] md:py-[40px]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg-semibold md:text-xl-semibold lg:text-2xl-semibold">
              게시물 등록하기
            </h2>
            <CommonButton
              isActive={isButtonActive}
              disabled={isButtonDisabled}
              onClick={handleSubmit}
              variant="primary"
            >
              {isLoading ? '등록 중...' : '등록하기'}
            </CommonButton>
          </div>
          <span className="text-xs-regular text-gray-400 md:text-lg-regular">
            {user?.name} {dateToString(new Date())}
          </span>
          <BoardInfoForm title={title} setTitle={setTitle} contentLength={contentLength} />
          <ReactQuillWrapper setContent={handleInputContent} content={content} />
        </main>
        <Link href="/boards" rel="preload">
          <CommonButton variant="secondary" className="my-8">
            목록으로
          </CommonButton>
        </Link>
      </div>
    </>
  );
};

export default AddBoard;
