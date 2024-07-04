import { useState } from 'react';
import router from 'next/router';
import { CommentFormData } from '@/types/apiType';
import CommonButton from '../common/CommonButton';
import ToastSelect from '../common/ToastSelect';

interface CommentFormProps {
  isLogin: boolean | undefined;
  onSubmit: (formData: CommentFormData) => Promise<void>;
}

const CommentForm = ({ isLogin, onSubmit }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const MAX_CHARACTERS = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.length <= MAX_CHARACTERS) {
      await onSubmit({ content });
      setContent('');
      setCharacterCount(0);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  const handleGuestRedirect = () => {
    ToastSelect({
      type: 'notification',
      message: '로그인 후 이용해주세요.',
      autoClose: 1000,
      onClose: () => {
        return router.push('/login');
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 h-[140px] min-w-[320px] rounded-10 bg-grayscale-100 p-5"
    >
      <textarea
        className="textareaNone h-[55%] w-full overflow-hidden bg-grayscale-100 text-grayscale-500"
        value={content}
        onChange={handleContentChange}
        placeholder="댓글을 입력하세요."
        maxLength={MAX_CHARACTERS}
      />

      <div className="flex items-end justify-between">
        <div className="text-grayscale-300">
          {characterCount}/{MAX_CHARACTERS}
        </div>
        <div>
          {isLogin ? (
            <CommonButton
              variant="primary"
              disabled={characterCount > MAX_CHARACTERS}
              type="submit"
            >
              댓글 작성
            </CommonButton>
          ) : (
            <CommonButton
              variant="primary"
              disabled={characterCount > MAX_CHARACTERS}
              onClick={handleGuestRedirect}
            >
              댓글 작성
            </CommonButton>
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
