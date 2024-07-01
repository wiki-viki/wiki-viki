import removeImports from 'next-remove-imports';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.namu.wiki', 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  compiler: {
    styledComponents: true,
  },
};

export default removeImports({})(nextConfig);
