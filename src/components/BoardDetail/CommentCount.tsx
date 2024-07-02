interface CommentCountProps {
  count: number | undefined;
}

const CommentCount = ({ count }: CommentCountProps) => {
  return (
    <>
      <div className="mt-10 text-lg-semibold lg:text-2lg-semibold">
        댓글 <span className="text-primary-green-200">{count}</span>
      </div>
    </>
  );
};

export default CommentCount;
