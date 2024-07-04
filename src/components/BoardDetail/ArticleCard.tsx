import React, { useEffect, useState } from 'react';
import { Zoom } from 'react-toastify';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Lottie from 'lottie-react';
import dateToString from '@/utils/dateToString';
import {
  deleteArticleLike,
  getDetailArticle,
  postArticleLike,
  deleteDetailArticle,
} from '@/lib/apis/article/articleApi.api';
import { ArticleResponse } from '@/types/apiType';
import { IdType } from '@/types/boardDetail';
import ToastSelect from '@/components/common/ToastSelect';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastContainer } from '@/styles/ToastStyle';
import DeleteIcon from '@/../public/svg/delete.svg';
import EditIcon from '@/../public/svg/edit.svg';
import { DeleteSuccess, UnableDelete } from '@/constants/toast';
import HeartLottie from '@/../public/lottie/heart.json';
import CommonButton from '../common/CommonButton';
import Loading from '../Loading';
import ConfirmModal from '../common/ConfirmModal';

interface ArticleCardProps {
  id: IdType;
  userId: number | undefined;
  isLogin: boolean | undefined;
}

const EditorComponent = dynamic(
  () => {
    return import('react-quill');
  },
  {
    loading: () => {
      return <div>...loading</div>;
    },
    ssr: false,
  },
);


const ArticleCard = ({ id, userId, isLogin }: ArticleCardProps) => {
  const [articleData, setArticleData] = useState<ArticleResponse | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [writerId, setWriterId] = useState<number>(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchBoardDetailData = async () => {
      try {
        const res = await getDetailArticle(Number(id));
        setArticleData(res);
        setLikeCount(res.likeCount);
        setIsLiked(res.isLiked);
        setWriterId(res.writer.id);
      } catch (error) {
        router.push('/500');
      }
    };

    fetchBoardDetailData();
  }, [id]);

  const handleLike = async () => {
    try {
      if (!isLogin) {
        ToastSelect({
          type: 'notification',
          message: '로그인 후 이용해주세요.',
          autoClose: 1000,
          onClose: () => {
            router.push('/login');
          },
        });
        return;
      }

      if (isLiked) {
        await deleteArticleLike(Number(id));
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      } else {
        const res = await postArticleLike(Number(id));
        setLikeCount(res.likeCount);
        setIsLiked(true);
      }
    } catch (error) {
      router.push('/500');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDetailArticle(Number(id));
      ToastSelect({
        type: 'check',
        message: DeleteSuccess,
        onClose: () => {
          router.push('/boards');
        },
      });
    } catch (error) {
      ToastSelect({ type: 'error', message: UnableDelete });
    }
  };

  const handleEdit = () => {
    console.log('handleEdit');
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    handleDelete();
    handleDeleteModalClose();
  };

  return (
    <>
      <StyledToastContainer limit={1} transition={Zoom} />
      {articleData ? (
        <>
          <div className="min-w-[320px] rounded-10 p-5 shadow-md lg:p-8">
            <div className="flex justify-between">
              <div className="flex-wrap break-words text-2xl-semibold text-grayscale-500 lg:text-3xl-bold">
                {articleData.title}
              </div>
              {userId === writerId && (
                <div className="flex gap-3 lg:hidden">
                  <motion.div className="hoverScale cursor-pointer" onClick={handleEdit}>
                    <EditIcon />
                  </motion.div>
                  <motion.div className="hoverScale cursor-pointer" onClick={handleDeleteModalOpen}>
                    <DeleteIcon />
                  </motion.div>
                </div>
              )}
              {userId === writerId && (
                <div className="hidden gap-3 lg:flex">
                  <CommonButton
                    variant="primary"
                    className="min-w-[120px] px-[32px]"
                    onClick={handleEdit}
                  >
                    수정하기
                  </CommonButton>
                  <CommonButton
                    variant="primary"
                    className="min-w-[120px] px-[32px]"
                    onClick={handleDeleteModalOpen}
                  >
                    삭제하기
                  </CommonButton>
                </div>
              )}
            </div>
            <div className="mt-3 flex justify-between border-b border-b-grayscale-200 pb-3 text-xs-regular text-grayscale-400 lg:text-md-regular">
              <div className="pr-3">
                {articleData.writer.name}
                <span className="ml-3">{dateToString(articleData.updatedAt)}</span>
              </div>
              <div onClick={handleLike} className=" cursor-pointer">
                <div className="relative flex items-center">
                  {isLiked ? (
                    <Lottie
                      animationData={HeartLottie}
                      style={{
                        position: 'absolute',
                        width: '40px',
                        height: '40px',
                        right: '4px',
                        zIndex: '-99',
                      }}
                      autoplay={true}
                      loop={false}
                    />
                  ) : (
                    <span className="mr-3.5 text-grayscale-400">❤︎</span>
                  )}
                  <span>{likeCount}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 text-md-regular text-grayscale-500 lg:text-lg-regular">
              <EditorComponent
                value={articleData.content}
                theme="bubble"
                readOnly={true}
                modules={{ toolbar: null }}
              />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteModalClose}
          title="게시글 삭제"
          message="게시글을 삭제하시겠습니까?"
          cancel="아니오"
          confirm="예"
        />
      )}
    </>
  );
};

export default ArticleCard;
