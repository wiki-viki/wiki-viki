import { ArticleListResponse } from '@/types/apiType';
import BoardCarousel from './BoardCarousel';
import BoardCard from './BoardCard';

interface BestBoardContainerProps {
  boardList: ArticleListResponse;
}

const BestBoardContainer = ({ boardList }: BestBoardContainerProps) => {
  return (
    <>
      <section className="hidden w-full grid-cols-2 gap-4 md:grid lg:grid-cols-4">
        {boardList.list.map((board) => {
          return <BoardCard key={board.id} board={board} />;
        })}
      </section>
      <section className="w-full md:hidden">
        <BoardCarousel>
          {boardList.list.map((board) => {
            return <BoardCard key={board.id} board={board} />;
          })}
        </BoardCarousel>
      </section>
    </>
  );
};

export default BestBoardContainer;
