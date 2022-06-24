const withPwa = require("next-pwa");


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  pwa: {
    dest: "public"
  }
}

module.exports = withPwa(nextConfig);
