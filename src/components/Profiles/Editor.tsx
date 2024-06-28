import { MDEditorProps } from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';

const MDEditor = dynamic<MDEditorProps>(
  () => {
    return import('@uiw/react-md-editor');
  },
  {
    ssr: false,
  },
);

const Markdown = dynamic(
  async () => {
    const mod = await import('@uiw/react-md-editor');
    return mod.default.Markdown;
  },
  {
    ssr: false,
  },
);

export type EditorProps = MDEditorProps;

export const Editor = ({ ...rest }: MDEditorProps) => {
  return <MDEditor {...rest} />;
};

export const EditorMarkdown = ({ source }: { source: string }) => {
  return <Markdown source={source} />;
};
