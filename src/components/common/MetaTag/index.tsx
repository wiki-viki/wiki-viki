import Head from 'next/head';

interface MetaTagProps {
  title?: string;
  description?: string;
}

const MetaTags = ({ title, description }: MetaTagProps) => {
  return (
    <Head>
      <title>WiKi ViKi {title && `| ${title}`}</title>
      <meta name="title" content={`wiki viki ${title && `| ${title}`}`} />
      <meta
        name="description"
        content={`함께 작성하는 우리의 위키, wiki viki ${description && `- ${description}`}`}
      />
    </Head>
  );
};

export default MetaTags;
