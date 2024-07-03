import removeImports from 'next-remove-imports';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.namu.wiki', 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  webpack: (config, { isServer }) => {
    // `react-quill` 모듈을 서버 측에서 제외하여 클라이언트 측에서만 사용할 수 있도록 합니다.
    if (isServer) {
      config.resolve.alias['react-quill'] = false;
    }

    // SVG 파일을 React 컴포넌트로 변환합니다.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default removeImports({})(nextConfig);
