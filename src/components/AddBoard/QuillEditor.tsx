import React, { useMemo, useRef } from 'react';
import ReactQuill, { UnprivilegedEditor, Quill } from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';
import useBoolean from '@/hooks/useBoolean';
import ImageAddModal from './ImageAddModal';

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
  const { value, handleOn, handleOff } = useBoolean();

  const handleClickImage = () => {
    handleOn();
  };

  const handleInsertImage = (url: string) => {
    const editor = QuillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, 'image', url);
      editor.insertText(range.index + 1, '\n');
      editor.setSelection(range.index + 2, 0);
      handleOff();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>
      <ReactQuill
        ref={QuillRef}
        placeholder="본문을 입력해주세요"
        theme="snow"
        modules={modules}
        value={content}
        formats={formats}
        onChange={handleQuillChange}
      />
      <ImageAddModal
        isOpen={value}
        onClose={handleOff}
        handleImageUrl={(url: string) => {
          handleInsertImage(url);
        }}
      />
    </>
  );
};

export default QuillEditor;
