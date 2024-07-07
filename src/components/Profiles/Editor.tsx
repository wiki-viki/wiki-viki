import { memo } from 'react';
import { MDEditorProps } from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';
import Loading from '../Loading';

const MDEditor = dynamic<MDEditorProps>(
  () => {
    return import('@uiw/react-md-editor');
  },
  {
    ssr: false,
    loading: () => {
      return <Loading />;
    },
  },
);

const Markdown = dynamic(
  async () => {
    const mod = await import('@uiw/react-md-editor');
    return mod.default.Markdown;
  },
  {
    ssr: false,
    loading: () => {
      return <Loading />;
    },
  },
);

export type EditorProps = MDEditorProps;

export const Editor = memo(({ ...rest }: MDEditorProps) => {
  return <MDEditor {...rest} />;
});

Editor.displayName = 'Editor';

export const EditorMarkdown = memo(({ source }: { source: string }) => {
  return <Markdown source={source} />;
});

EditorMarkdown.displayName = 'EditorMarkdown';
