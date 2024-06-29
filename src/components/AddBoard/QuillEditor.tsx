import React, { useMemo, useState } from 'react';
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
  setContent: (value: string, length: { withSpaces: number; withoutSpaces: number }) => void;
}

const QuillEditor = ({ setContent }: QuillEditorProps) => {
  const [value, setValue] = useState('');

  const handleClickImage = () => {
    alert('추후 모달 배치할 예정');
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

  const handleQuillChange = (value: string) => {
    setValue(value);
    const textOnly = value.replace(/(<([^>]+)>)/gi, '');
    const withSpaces = textOnly.length;
    const withoutSpaces = textOnly.replace(/\s/g, '').length;
    setContent(value, { withSpaces, withoutSpaces });
  };

  return (
    <QuillNoSSRWrapper
      placeholder="본문을 입력해주세요"
      theme="snow"
      modules={modules}
      value={value}
      formats={formats}
      onChange={handleQuillChange}
    />
  );
};

export default QuillEditor;
