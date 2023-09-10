/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        port: "",
        pathname: "/chickstyler.store/images/**",
      },
    ],
  },
  webpack: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};

module.exports = nextConfig;
