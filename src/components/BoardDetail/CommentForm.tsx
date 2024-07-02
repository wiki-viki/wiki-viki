import { useState } from 'react';
import { CommentFormData } from '@/types/apiType';
import CommonButton from '../common/CommonButton';

interface CommentFormProps {
  onSubmit: (formData: CommentFormData) => Promise<void>;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
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
    const newContent = e.target.value;
    setContent(newContent);
    setCharacterCount(newContent.length);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 h-[140px] min-w-[320px] rounded-10 bg-grayscale-100 p-5"
    >
      <textarea
        className="textarea-none h-[55%] w-full overflow-hidden bg-grayscale-100 text-grayscale-500"
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
          <CommonButton
            variant="primary"
            disabled={characterCount > MAX_CHARACTERS}
            type="submit"
            className=""
          >
            댓글 작성
          </CommonButton>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
