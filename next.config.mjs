/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**', // Matches any pathname under this hostname
      },
      {
        protocol: 'https',
        hostname: 'url-shortener.me',
        pathname: '/**', // Matches any pathname under this hostname
      },
    ],
  },
};

export default nextConfig;
