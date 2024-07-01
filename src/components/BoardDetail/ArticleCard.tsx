import React, { useEffect, useState } from 'react';
import { Zoom } from 'react-toastify';
import { useRouter } from 'next/router';
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

interface ArticleCardProps {
  id: IdType;
}

const DeleteSuccess = '게시글 삭제가 완료되었습니다.';
const UnableDelete = '게시글 작성자만 삭제할 수 있습니다.';

const ArticleCard = ({ id }: ArticleCardProps) => {
  const [articleData, setArticleData] = useState<ArticleResponse | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBoardDetailData = async () => {
      try {
        const res = await getDetailArticle(Number(id));
        setArticleData(res);
        setLikeCount(res.likeCount);
        setIsLiked(res.isLiked);
      } catch (error) {
        console.error('error', error);
        //에러 처리를 toast로 할까요? 아니면 따로 할까요?
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
      console.error('error', error);
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
        //onClose를 추가했습니다! 토스트 종료 후 원하는 함수를 지정하시면 됩니다~~~
      });
    } catch (error) {
      ToastSelect({ type: 'error', message: UnableDelete });
    }
  };

  return (
    <>
      <StyledToastContainer limit={1} transition={Zoom} />
      {articleData ? (
        <>
          <div>{articleData.title}</div>
          <div>{articleData.writer.name}</div>
          <div>{dateToString(articleData.updatedAt)}</div>
          <div onClick={handleLike}>
            <div className="flex items-center">
              {isLiked ? (
                <span className="mr-[2px] text-primary-green-200">❤︎</span>
              ) : (
                <span className="mr-[2px] text-grayscale-400">❤︎</span>
              )}
              <span>{likeCount}</span>
            </div>
          </div>
          <div>{articleData.content}</div>
          <button onClick={handleDelete}>삭제</button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ArticleCard;
