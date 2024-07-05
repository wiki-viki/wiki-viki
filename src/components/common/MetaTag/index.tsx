import Head from 'next/head';

interface MetaTagProps {
  title?: string;
  description?: string;
}

const MetaTags = ({ title, description }: MetaTagProps) => {
  return (
    <Head>
      <title>WiKi ViKi {title && `| ${title}`}</title>
      <meta name="title" content={`WiKi ViKi ${title && `| ${title}`}`} />
      <meta
        name="description"
        content={`남들이 만드는 나만의 위키, WiKi ViKi ${description && `- ${description}`}`}
      />
    </Head>
  );
};

export default MetaTags;
