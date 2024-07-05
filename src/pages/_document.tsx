import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  const siteName = 'WiKi ViKi';
  const siteImage =
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/133/1720181652433/wikivikiog.png';

  return (
    <Html lang="ko" data-color-mode="light">
      <title>WiKi ViKi</title>
      <Head>
        <link rel="icon" type="image/svg+xml" href="./image/wiki-viki-sm-logo.png" />
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="author" content="코드잇 스프린트 6기 파트3 16팀 위키드" />
        <meta name="keywords" content="코드잇, 스프린트, 16팀, 위키드, 위키비키, 프로젝트" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content={siteImage} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={siteImage} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
