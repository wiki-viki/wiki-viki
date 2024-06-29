import React, { useMemo, useRef } from 'react';
import ReactQuill, { UnprivilegedEditor } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formats = [
  'bold',
  'italic',
  'underline',
  'align',
  'list',
  'bullet',
  'color',
  'image',
  'link',
];

interface QuillEditorProps {
  content: string;
  setContent: (value: string, length: { withSpaces: number; withoutSpaces: number }) => void;
}

const QuillEditor = ({ content, setContent }: QuillEditorProps) => {
  const QuillRef = useRef<ReactQuill>(null);

  const handleClickImage = () => {
    const editor = QuillRef.current?.getEditor();
    if (editor) {
      console.log(editor);
      const range = editor.getSelection(true);
      editor.insertEmbed(
        range.index,
        'image',
        'https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_1280.jpg',
      );
      editor.setSelection(range.index + 1, 0);
    }
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
    <ReactQuill
      ref={QuillRef}
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
