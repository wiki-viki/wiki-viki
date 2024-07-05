import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
