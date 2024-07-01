import { useState } from 'react';
import { CommentFormData } from '@/types/apiType';

interface CommentFormProps {
  onSubmit: (formData: CommentFormData) => Promise<void>;
}

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ content });
    setContent('');
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={handleContentChange} placeholder="댓글을 입력하세요." />
      <button type="submit">댓글 작성</button>
    </form>
  );
};

export default CommentForm;
