/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, ForwardedRef } from 'react';
import ReactQuill, { Quill, UnprivilegedEditor } from 'react-quill';
import dynamic from 'next/dynamic';
import { ImageActions } from '@xeger/quill-image-actions';
import useBoolean from '@/hooks/useBoolean';
import ImageAddModal from './ImageAddModal';

interface ReactQuillProps {
  forwardedRef?: ForwardedRef<any>; // 적절한 타입으로 변경 가능
  [key: string]: any;
}

const ReactQuillDynamic = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return (props: ReactQuillProps) => {
      return <RQ ref={props.forwardedRef} {...props} />;
    };
  },
  { ssr: false },
);
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
  const quillRef = useRef<ReactQuill>(null);
  const { value, handleOn, handleOff } = useBoolean();

  const handleClickImage = () => {
    handleOn();
  };

  const handleInsertImage = (url: string) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, 'image', url);
      editor.setSelection(range.index + 1, 0);
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
      <ReactQuillDynamic
        forwardedRef={quillRef}
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
