const withPwa = require("next-pwa");


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  pwa: {
    dest: "build"
  }
}

module.exports = withPwa(nextConfig);
