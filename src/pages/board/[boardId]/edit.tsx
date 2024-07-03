import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Zoom } from 'react-toastify';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { parse } from 'cookie';
import { IncomingMessage } from 'http';
import { StyledToastContainer } from '@/styles/ToastStyle';
import CommonButton from '@/components/common/CommonButton';
import dateToString from '@/utils/dateToString';
import BoardInfoForm from '@/components/AddBoard/BoardInfoForm';
import { refineHTMLContent } from '@/utils/quillHtmlHandler';
import { type DateType, type ArticleFormData } from '@/types/apiType';
import { changeDetailArticle, getDetailArticle } from '@/lib/apis/article/articleApi.api';
import ToastSelect from '@/components/common/ToastSelect';
import { OTHER_TYPE_ERROR_TEXT } from '@/constants/otherTypeErrorText';
import 'react-toastify/dist/ReactToastify.css';

type ContextProps = {
  params: { [x: string]: string };
  req: IncomingMessage;
};

export const getServerSideProps = async (context: ContextProps) => {
  const boardId = context.params?.boardId;
  const cookies = parse(context.req.headers.cookie || '');
  const userId = cookies.userId;

  try {
    const response = await getDetailArticle(Number(boardId));

    // 유효하지 않은 회원 접근 제한
    if (Number(userId) !== response?.writer.id) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        initTitle: response?.title,
        initContent: response?.content,
        initCreateAt: response?.createdAt,
        boardId,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const ReactQuillWrapper = dynamic(import('@/components/AddBoard/QuillEditor'), {
  ssr: false,
  loading: () => {
    return <p>Loading...</p>;
  },
});

interface EditBoardProps {
  initTitle: string;
  initContent: string;
  initCreateAt: DateType;
  boardId: number;
  alertMessage?: string;
}

const EditBoard = ({ initTitle, initContent, initCreateAt, boardId }: EditBoardProps) => {
  const [title, setTitle] = useState(initTitle);
  const [content, setContent] = useState(initContent);
  const [contentLength, setContentLength] = useState({ withSpaces: 0, withoutSpaces: 0 });
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const isButtonActive = isValid && !isLoading;
  const isButtonDisabled = !isValid || isLoading;

  // 게시물 수정하기
  const handleSubmit = async () => {
    setIsLoading(true);
    const { firstImageSrc, newContent } = refineHTMLContent(content);

    const boardData: ArticleFormData = {
      title,
      content: newContent,
      image: firstImageSrc
        ? firstImageSrc
        : 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/133/1720006227876/empty-image.png',
    };

    try {
      const response = await changeDetailArticle(Number(boardId), boardData);
      ToastSelect({
        type: 'check',
        message: '게시물이 수정되었습니다',
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
    <div className="center mt-4 flex-col">
      {isValid && createPortal(<StyledToastContainer transition={Zoom} />, document.body)}
      <main className="md:profile-shadow flex w-full max-w-[1060px] flex-col gap-3 rounded-10 md:gap-5 md:px-[30px] md:py-[40px]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg-semibold md:text-xl-semibold lg:text-2xl-semibold">
            게시물 수정하기
          </h2>
          <CommonButton
            isActive={isButtonActive}
            disabled={isButtonDisabled}
            onClick={handleSubmit}
            variant="primary"
          >
            {isLoading ? '수정 중...' : '수정하기'}
          </CommonButton>
        </div>
        <span className="text-xs-regular text-gray-400 md:text-lg-regular">
          등록일 {dateToString(initCreateAt)}
        </span>
        <BoardInfoForm title={title} setTitle={setTitle} contentLength={contentLength} />
        <ReactQuillWrapper setContent={handleInputContent} content={content} />
      </main>
      <Link href={`/board/${boardId}`} rel="preload">
        <CommonButton variant="secondary" className="my-8">
          원본으로
        </CommonButton>
      </Link>
    </div>
  );
};

export default EditBoard;
