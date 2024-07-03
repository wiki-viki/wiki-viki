import React, { useEffect, useState } from 'react';
import { Zoom } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/userAuthStore';
import CommonButton from '../common/CommonButton';
import Loading from '../Loading';

interface ArticleCardProps {
  id: IdType;
}

const ArticleCard = ({ id }: ArticleCardProps) => {
  const [articleData, setArticleData] = useState<ArticleResponse | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [writerId, setWriterId] = useState<number>(0);

  const router = useRouter();

  const userId = useStore(useAuthStore, (state) => {
    return state.user?.id;
  });

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
                  <motion.div className="hoverScale" onClick={handleEdit}>
                    <EditIcon />
                  </motion.div>
                  <motion.div className="hoverScale" onClick={handleDelete}>
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
                    onClick={handleDelete}
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
              <div onClick={handleLike}>
                <div className="flex items-center">
                  {isLiked ? (
                    <motion.span
                      className="mr-1.5 text-primary-green-200"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.3, ease: 'easeInOut', repeat: 0.15 }}
                    >
                      ❤︎
                    </motion.span>
                  ) : (
                    <span className="mr-1.5 text-grayscale-400">❤︎</span>
                  )}
                  <span>{likeCount}</span>
                </div>
              </div>
            </div>
            {articleData.image && (
              <div className=" relative mt-3 lg:mb-5 lg:mt-8">
                <Image src={articleData.image} alt="게시글 이미지" width={500} height={300} />
              </div>
            )}
            <div className="mt-3 text-md-regular text-grayscale-500 lg:text-lg-regular">
              {articleData.content}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ArticleCard;
