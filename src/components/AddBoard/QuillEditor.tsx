import React, { useMemo, useRef } from 'react';
import ReactQuill, { UnprivilegedEditor, Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageActions } from '@xeger/quill-image-actions';

Quill.register('modules/imageActions', ImageActions);

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
  'height',
  'width',
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
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/114/1719367563327/imagetest.jpeg',
      );
      editor.setSelection(range.index + 1, 0);
    }
  };

  const modules = useMemo(() => {
    return {
      imageActions: {},
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
        ImageResize: {
          modules: ['Resize'],
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
