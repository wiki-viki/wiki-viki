import React, { useMemo } from 'react';
import { UnprivilegedEditor } from 'react-quill';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => {
    return <p>Loading...</p>;
  },
});

const formats = ['bold', 'italic', 'underline', 'align', 'list', 'bullet', 'color', 'link'];

interface QuillEditorProps {
  content: string;
  setContent: (value: string, length: { withSpaces: number; withoutSpaces: number }) => void;
}

const QuillEditor = ({ content, setContent }: QuillEditorProps) => {
  const handleClickImage = () => {
    alert('추후 모달에서 이미지 업로드할 예정');
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline'],
          [{ align: '' }, { align: 'center' }, { align: 'right' }],
          [{ list: 'bullet' }, { list: 'ordered' }],
          [{ color: [] }, 'image'],
          ['link'],
        ],
        handlers: {
          image: handleClickImage,
        },
      },
    };
  }, []);

  const handleQuillChange = (
    value: string,
    _: unknown,
    __: unknown,
    editor: UnprivilegedEditor,
  ) => {
    const inputText = editor.getText().replace(/\n/g, '');

    const withSpaces = inputText.length;
    const withoutSpaces = inputText.replace(/\s/g, '').length;

    setContent(value, { withSpaces, withoutSpaces });
  };

  return (
    <QuillNoSSRWrapper
      placeholder="본문을 입력해주세요"
      theme="snow"
      modules={modules}
      value={content}
      formats={formats}
      onChange={handleQuillChange}
    />
  );
};

export default QuillEditor;
