import Head from 'next/head';

interface MetaTagProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const MetaTag = ({ title, description, url, image }: MetaTagProps) => {
  return (
    <Head>
      <title>WiKi ViKi {title && `| ${title}`}</title>
      <meta name="title" content={`WiKi ViKi ${title && `| ${title}`}`} />
      <meta
        name="description"
        content={`남들이 만드는 나만의 위키, WiKi ViKi ${description && `- ${description}`}`}
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={`WiKi ViKi ${title && `| $title`}`} />
      <meta
        property="og:description"
        content={`남들이 만드는 나만의 위키, WiKi ViKi ${description && `- ${description}`}`}
      />
      <meta property="og:url" content={`https://wiki-viki.vercel.app/${url}`} />
      <meta property="og:image" content={image || 'https://i.ibb.co/LSkZvSt/wiki-viki-2.png'} />
      <meta property="og:site_name" content="WiKi ViKi" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://wiki-viki.vercel.app/${url}`} />
      <meta name="twitter:title" content="WiKi ViKi" />
      <meta
        name="twitter:description"
        content={`남들이 만드는 나만의 위키, WiKi ViKi ${description && `- ${description}`}`}
      />
      <meta name="twitter:image" content={image || 'https://i.ibb.co/LSkZvSt/wiki-viki-2.png'} />
    </Head>
  );
};

export default MetaTag;
