import Head from 'next/head';

interface OpenGraphProps {
  title?: string;
  description?: string;
}

const OpenGraphTag = ({ title, description }: OpenGraphProps) => {
  return (
    <Head>
      <meta property="og:title" content={`WiKi ViKi ${title && `| ${title}`}`} />
      <meta
        property="og:description"
        content={`함께 작성하는 우리의 위키, wiki viki ${description && `- ${description}`}`}
      />

      <meta name="twitter:title" content={`WiKi ViKi ${title && `| ${title}`}`} />
      <meta
        name="twitter:description"
        content={`함께 작성하는 우리의 위키, wiki viki ${description && `- ${description}`}`}
      />
    </Head>
  );
};

export default OpenGraphTag;
