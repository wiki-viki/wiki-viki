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
        content={`남들이 만드는 나만의 위키, WiKi ViKi ${description && `- ${description}`}`}
      />

      <meta name="twitter:title" content={`WiKi ViKi ${title && `| ${title}`}`} />
      <meta
        name="twitter:description"
        content={`남들이 만드는 나만의 위키, WiKi ViKi ${description && `- ${description}`}`}
      />
    </Head>
  );
};

export default OpenGraphTag;
