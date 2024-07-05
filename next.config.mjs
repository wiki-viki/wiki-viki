import removeImports from 'next-remove-imports';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [480, 769, 1280, 1920, 2048, 3840],
    domains: ['i.namu.wiki', 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['react-quill'] = false;
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default removeImports({})(nextConfig);
