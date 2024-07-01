import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko" data-color-mode="light">
      <meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no" />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
